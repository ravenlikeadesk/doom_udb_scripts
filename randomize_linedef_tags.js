/// <reference path="../../../udbscript.d.ts" />

`#version 4`;

`#name Randomize linedef tags`;

`#description Randomize linedef tags`;

`#scriptoptions

start_tag
{
    description = "start of tag range";
    type = 0;
    default = 100;
}

end_tag
{
    description = "end of tag range (inclusive)";
    type = 0;
    default = 107;
}

`;

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

let lines = UDB.Map.getSelectedOrHighlightedLinedefs();
let start_tag = UDB.ScriptOptions.start_tag;
let end_tag = UDB.ScriptOptions.end_tag;

if (lines.length == 0)
    die('No linedefs selected or highlighted');

lines.forEach(ld => {
    let tag = getRandomIntInclusive(start_tag, end_tag);
    ld.tag = tag;
});
