# udb scripts
Some scripts for UDB that I made.
I don't know javascript so expect the code to be pretty ugly.

### bitmap tagging
Assign tags to sectors in a two-dimensional array like order.
Needed as a prerequisite for vertical_text.js to run.

### vertical text
Bitmap-based generator for outputting text on walls.
Make a diagonal screen, run bitmap tagging on it and then use vertical_text.js to generate voodoo closet linedefs.
6x8 glyphs are hardcoded, but the script is easy to modify to use different glyphs and different resolution.
