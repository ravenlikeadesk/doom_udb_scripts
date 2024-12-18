`#version 4`;

`#name bitmap tagging`;

`#description Tags sectors with increasing tag values in a bitmap way. West to east, south to north.`;

`#scriptoptions

field_width {
    description = "Width of a bitmap field";
    default = 84;
    type = 0;
}

field_height {
    description = "Height of a bitmap field";
    default = 32;
    type = 0;
}

elem_width {
    description = "Width of a bitmap element";
    default = 6;
    type = 0;
}

elem_height {
    description = "Height of a bitmap element";
    default = 8;
    type = 0;
}

tag_range_start {
    description = "Start of tag range";
    default = 1000;
    type = 0;
}

`;


function get_sector_vertices(s) {
    let vertices = new Set();
    s.getSidedefs().forEach(side => vertices.add(side.line.start).add(side.line.end));
    return Array.from(vertices);
}

function vertices_compare(a, b) {
    if (a.position.y > b.position.y) {
        return 1;
    }
    if (a.position.y < b.position.y) {
        return -1;
    }
    if (a.position.x < b.position.x) {
        return -1;
    }
    if (a.position.x > b.position.x) {
        return 1;
    }
    return 0;
}

function get_top_left_vertex(v_arr) {
    return v_arr.sort(vertices_compare)[0];
}

function sectors_compare(a, b) {
    va = get_top_left_vertex(get_sector_vertices(a));
    vb = get_top_left_vertex(get_sector_vertices(b));
    return vertices_compare(va, vb);
}

var so = UDB.ScriptOptions;
var sectors = UDB.Map.getSelectedSectors();

if (so.field_width % so.elem_width != 0) {
    UDB.log("Field width must be a multiple of element width");
    return;
}

if (so.field_height % so.elem_height != 0) {
    UDB.log("Field height must be a multiple of element height");
    return;
}

UDB.log(sectors.length);

if (sectors.length != so.field_width * so.field_height) {
    UDB.log("Whole field must be selected");
    return;
}

UDB.log("hi hi hi hi hi");
// sectors.forEach(s => UDB.log(get_top_left_vertex(get_sector_vertices(s))));
tag = so.tag_range_start;
sectors.sort(sectors_compare);
sectors.forEach(s => s.tag = tag++);
