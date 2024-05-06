`#version 4`;

`#name vertical text writer`;

`#description Pixel art vertical text, 6x8 pixels characters size. Uses ; for line delimeter. Run bitmap tagging on bitmap field beforehand. Linedefs will be drawn North from the selected vertex.`;

`#scriptoptions

rows {
    description = "Rows of text";
    default = 4;
    type = 0;
}

char_per_row {
    description = "Characters per row";
    default = 14;
    type = 0;
}

starting_tag {
    description = "First tag of the bitmap";
    default = 1000;
    type = 0;
}

text {
    description = "Text to write";
    default = "hi hi hi hi;xddLove;any chatters?;type 1 in chat";
    type = 2;
}
`;

var char_map = new Map([
    [' ', [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['?', [
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['.', [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    [',', [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['\'', [
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['1', [
        [1, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['A', [
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['B', [
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['C', [
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['D', [
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['E', [
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['F', [
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['G', [
        [0, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['H', [
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['I', [
        [1, 1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['J', [
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['K', [
        [1, 0, 0, 1, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [1, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['L', [
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['M', [
        [1, 0, 0, 0, 1, 0],
        [1, 1, 0, 1, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['N', [
        [1, 0, 0, 1, 0, 0],
        [1, 1, 0, 1, 0, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['O', [
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['P', [
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['Q', [
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['R', [
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['S', [
        [0, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['T', [
        [1, 1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['U', [
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['V', [
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['W', [
        [1, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['X', [
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['Y', [
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
    ['Z', [
        [1, 1, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]]],
]);

var so = UDB.ScriptOptions;
var ref_vertices = UDB.Map.getSelectedVertices();

if (ref_vertices.length != 1) {
    UDB.log("Exactly one vertex must be selected as a reference point");
    return;
}

var ref_vertex = ref_vertices[0];

const char_width = 6;
const char_height = 8;
const total_width = so.char_per_row * char_width;
const total_height = so.rows * char_height;
const first_linedef_north_offset = 64;
const linedef_spacing = 8;
const lit_line_action = 81; // WR Light Change to 255
const clear_line_action = 79; // WR Light Change to 35
const clear_offset = 64;

UDB.log("hi hi hi hi hi");

var starting_tag = so.starting_tag;
var cur_char = 0;
var start_x = ref_vertex.position.x;
var start_y = ref_vertex.position.y;

UDB.log(starting_tag);

var all_tags_used = [];
var text_lines = so.text.toUpperCase().split(";");
for (let i = 0; i < text_lines.length; i++) {
    let line = text_lines[i];
    if (line.length > so.char_per_row) {
            UDB.log("line is too long: " + line);
            return;
    }

    for (let j = 0; j < line.length; j++) {
        let c = line.charAt(j);

        UDB.log(c);

        if (!char_map.has(c)) {
            UDB.log("Unsupported character in text: " + c);
            return;
        }

        let tag_base = starting_tag + (i * char_height) * (total_width) + j * char_width;
        let linedef_offset = first_linedef_north_offset + linedef_spacing * cur_char;
        let bitmap = char_map.get(c);
        let verts = [[]];

        for (let row = 0; row < char_height; row++) {
            for (let col = 0; col < char_width; col++) {
                let lit = bitmap[row][col];
                let tag = tag_base + row * total_width + col;
                if (lit) {
                    all_tags_used.push(tag);
                    let coord_x = start_x - 16 + row * char_width + col;
                    let coord_y = start_y + linedef_offset;
                    UDB.Map.drawLines([[coord_x, coord_y], [coord_x + 1, coord_y], [coord_x, coord_y]]);
                    let linedefs = UDB.Map.getLinedefs();
                    linedefs[linedefs.length - 1].tag = tag;
                    linedefs[linedefs.length - 1].action = lit_line_action;
                }
            }
        }
        cur_char++;
    }
}

UDB.log("clearing screen, total tags = " + all_tags_used.length);
let clear_y_coord = start_y + first_linedef_north_offset + linedef_spacing * cur_char + clear_offset;
UDB.Map.drawLines([[start_x - 32, clear_y_coord - 4], [start_x + 32, clear_y_coord - 4], [start_x - 32, clear_y_coord - 4]]);
for (let i = 0; i < all_tags_used.length; i++) {
    let coord_x = start_x - 16 + (i % 32);
    let coord_y = clear_y_coord + Math.floor(i / 32);
    UDB.Map.drawLines([[coord_x, coord_y], [coord_x + 1, coord_y], [coord_x, coord_y]]);
    let linedefs = UDB.Map.getLinedefs();
    linedefs[linedefs.length - 1].tag = all_tags_used[i];
    linedefs[linedefs.length - 1].action = clear_line_action;
}
clear_y_coord += 16;
UDB.Map.drawLines([[start_x - 32, clear_y_coord], [start_x + 32, clear_y_coord], [start_x - 32, clear_y_coord]]);
