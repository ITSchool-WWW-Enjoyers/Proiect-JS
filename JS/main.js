/* Button defining

Defining the various buttons that handle events such as Undo, Redo, Color-Pick etc.

*/

const pen = document.getElementById("pen-tool");
const strokeSize = document.getElementById("line-width");
const eraser = document.getElementById("eraser-tool");
const colorInput = document.getElementById("color-picker"); 
const resetTool = document.getElementById("reset-tool"); 
const fillTool = document.getElementById("fill-tool"); 
const solidSelect = document.getElementById("solid-shape");
const undoButton = document.getElementById("undobutton"); 
const redoButton = document.getElementById("redobutton"); 
const drawRectangle = document.getElementById("drawRectangle");
const drawEllipse = document.getElementById("drawEllipse");
const drawTriangle = document.getElementById("drawTriangle");
const helpButton = document.getElementById("help");
const dialogBox = document.getElementById("help-text");

/* Canvas defining

Defining the canvas area, as well as the context in which we allow the user to interact with the canvas.

*/

const canvas = document.getElementById("canvas"); 
const context = canvas.getContext("2d");

/* Drawing dafult event

Definig the default draw state.

*/

let drawing = false;

/* Draw States, Redo States

Definig the two arrays responsible for storing drawStates (after each draw interaction) and redoStates (after each Undo in order to be able to Redo previous changes).

*/

let drawingStates = [];
let redoStates = [];

/* Count drawStates and checkStateNumber

Defining the two variable so that we can check how many times a draw event has happened.

*/

let drawingStateNumber = 0;
let checkStateNumber = 0;

/* Rectangle/Shape start position

Defining the initial position for the shapes that we are about to draw.

*/

let rectStart = getMousePos;

/* Color change function and event

Defining the color of the color picker SVG, as well as the drawing tool itself.
We have an initial setting which sets the default color (black) for both by calling the function once.

We check if the eraser is checked, so that we are not trying to update the colors of the eraser.

*/

function colorChange() {
    const colorInput = document.getElementById("color-picker").value;
    const colorPickerPath = document.getElementById("current-color");

    colorPickerPath.style.fill = colorInput;
    
    if(!eraser.checked) {
        context.strokeStyle = colorInput;
        context.fillStyle = colorInput;
    };
};

colorChange();
colorInput.addEventListener("input", colorChange);

function lineWidth() {
    const widthValue = strokeSize.value;

    context.lineWidth = widthValue;
};

strokeSize.addEventListener("change", lineWidth);

/* Eraser Function

Definig the eraser function.

If the eraser is clicked on, the function makes sure that the HTML Input marks it as checked, then it proceeds to overwrite the current color with white.

*/

function eraserTool() {
    if(eraser.checked) {
        context.strokeStyle = "#FFF";
        context.fillStyle = "#FFF";
    };
};

eraser.addEventListener("click", eraserTool);

/* Start Draw Function

Defining the event which handles the start of the drawing event.

It check if the left click is pressed in order for the function to start;

Sets the drawing defined at the start of the code to true (which is used later in the draw function itself);

Checks if the pen HTML Input Element is checked, then calls for a colorChange and starts to draw;

Finally, updates the drawingStateNumber by adding 1 to the total number of times the user has drawin on the canvas.

The event is triggerd by left clicking on the canvas area.

*/

function startDrawing(e) {
    if (e.buttons === 1) {
        drawing = true;
        context.beginPath();

        if(pen.checked) {
            colorChange();
            draw(e);
        };

        drawingStateNumber += 1;
    };
    rectStart = getMousePos(canvas,e);
};

canvas.addEventListener("mousedown", startDrawing);

/* End Draw Function

Checks if drawing is set to true;

Checks which shape is currently active so that it can call the function handling said shape in order for it to be drawn at mouse realease;

"Pushes" the current state to drawingStates in order to be able to use the Undo/Redo functions properly.

Sets drawing to false;

Sets the rectStart (which is used in order to draw shapes) to be the last mouse position.

The event is triggerd by releasing the left click, if the left click was within the canvas bounds.

*/

function endDrawing(e) {
    if (drawing) {
        if(drawRectangle.checked) {
            colorChange();
            drawSquare(e);
        };

        if(drawEllipse.checked) {
            colorChange();
            drawCircle(e);
        };

        if(drawTriangle.checked) {
            colorChange();
            drawTriangl(e);
        };

        drawingStates.push(canvas.toDataURL()); 
        drawing = false;
    };

    setTimeout(() => {
        rectStart = 0; 
    }, 0);
};

canvas.addEventListener("mouseup", endDrawing);


/* Get Mouse Position Function

Within the function we retrieve the position and the dimensions of the canvas element;

ScaleX and ScaleY calculate the scaling factor of the canvas element.

Finally the function returns an object which adjusts the scaling factors.

*/

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
};

/* Draw Function

Checks is some conditions are met, and depending on which is true, executes the said drawing style/shape;

If the drawing function is set to false, the function exits;

Sets the x and y position to the mouse coordinates (after click);

Draws a line to x and y;

Finally redenrs the current path that has been defined to said coordinates.

The function is used in the startDrawing function in order for the user to be able to start drawing.

*/

function draw(e) {
    if(drawRectangle.checked) {
        return;
    };

    if(drawEllipse.checked) {
        return;
    };

    if(drawTriangle.checked) {
        return;
    };

    if (!drawing) {
        return;
    };

    let { x, y } = getMousePos(canvas, e);

    context.lineTo(x, y);
    context.stroke();
};

canvas.addEventListener("mousemove", draw);

/* Draw Square

Checks if the drawRectangle HTML Radio Input is checked;

If drawing is set to false, the function exits;

Sets the x and y to the current mouse possition;

Gets a width and a height for the current shape;

Draw the rectangle from the initial mouse position to the latest one;

If the solidSelect is checked, the shape will be filled;

Event is called in the draw function.

*/

function drawSquare(e) {
    if (!drawing) {
        return;
    }
    
    let { x, y } = getMousePos(canvas, e);

    let width = x - rectStart.x;
    let height = y - rectStart.y;

    context.strokeRect(rectStart.x, rectStart.y, width, height);

    if (solidSelect.checked) {
        context.fillRect(rectStart.x, rectStart.y, width, height);
    };
};

/* Draw Ellipse

Checks if the drawEllipse HTML Radio Input is checked;

If drawing is set to false, the function exits;

Sets the x and y to the current mouse possition;

Gets a width and a height for the current shape;

Gets the center by divinding the initial mouse on both axis to 2;  

Calculates the radius for both axis;

Draws the ellipse from the initial mouse position to the latest one.

If the solidSelect is checked, the shape will be filled;

Event is called in the draw function.

*/

function drawCircle(e) {
    if (!drawing) {
        return;
    };

    let { x, y } = getMousePos(canvas, e);

    let width = x - rectStart.x;
    let height = y - rectStart.y;

    let centerX = rectStart.x + width / 2;
    let centerY = rectStart.y + height / 2;
    let radiusX = Math.abs(width / 2);
    let radiusY = Math.abs(height / 2);

    context.beginPath();
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    context.stroke();

    if (solidSelect.checked) {
        context.fill();
    };
};

/* Draw Triangle

Checks if the drawTriangle HTML Radio Input is checked;

If drawing is set to false, the function exits;

Sets the x and y to the current mouse possition;

Calculates the lenghts of each side so that the triangle is more or less equilateral;

Draws the ellipse from the initial mouse position to the latest one.

If the solidSelect is checked, the shape will be filled;

Event is called in the draw function.

*/

function drawTriangl(e) {
    if (!drawing) {
        return;
    };

    let { x, y } = getMousePos(canvas, e);

    const sideLength = Math.sqrt(Math.pow(x - rectStart.x, 2) + Math.pow(y - rectStart.y, 2));

    const xOffset = (x - rectStart.x) / 2;
    const yOffset = (Math.sqrt(3) / 2) * sideLength;

    const x2 = rectStart.x + xOffset;
    const y2 = rectStart.y + yOffset;

    context.beginPath();
    context.moveTo(rectStart.x, rectStart.y);
    context.lineTo(x, y);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();

    if (solidSelect.checked) {
        context.fill();
    };
};

/* Canvas Reset Tool

We define the function that handles the canvas reset.

Resets the whole canvas to a default state as well as the lineWidth of the Pen/Shape.

The color is updated to the latest color that was picked in the Color-Picker, so that there is no confusion.

Finally we create a drawingState so that it can be undone to, if needed.

The event is called by clicking on the UI element "Reset".
*/

function resetCanvas() {
    context.reset();
    colorChange();
    drawingStates.push(canvas.toDataURL());
};

resetTool.addEventListener("click", resetCanvas);

/* Canvas Fill Tool

We define the function that handles the canvas fill with the current color that is displayed in the UI and is also set with the changeColor function.

Note: This overwrites anything already drawn on the canvas!

It then "pushes" a state in the drawingState Array.

The event is called by clicking on the UI element "Fill".
*/

function fillCanvas() {
    if(!eraser.checked) {
        colorChange();
        context.fillRect(0,0,canvas.width,canvas.height);
        drawingStates.push(canvas.toDataURL());
    };
};

fillTool.addEventListener("click", fillCanvas);

/* Undo function

Defining the function which handles the undo event.

We are updating the check checkStateNumber to be equal with the drawingStateNumber (which is used later at the redo button 
to determin whether the user drew after the undo button in order to deactivate the redo button);

We are updating the redoStates defined at the start of the code so that we can have a state to redo to, if needed;

We are checking if there are any drawStates to which we can undo to;

We are clearing the canvas before doing the undo, as the state previously saved would overlap the present canvas;

We are "popping" the undo state from the drawingStates Array;

We are importing the previous state (-1) as an img at 0,0 coordinates;

Finally we have the two ways to call the event (one is present on the UI and the other one is the combination of CTRL + "z" for Windows or CMD + "z" for MacOS).
*/

function undo() {
    checkStateNumber = drawingStateNumber;
    redoStates.push(canvas.toDataURL());
    if (drawingStates.length > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawingStates.pop();
        const img = new Image();
        img.src = drawingStates[drawingStates.length - 1];
        img.addEventListener("load", () => {
            context.drawImage(img, 0, 0);
        });
    };
};

window.addEventListener("keydown", (ev) => {
    if (ev.key === "z" && ev.ctrlKey) {
        undo();
    };

    if (ev.metaKey === "z" && ev.ctrlKey) {
        undo();
    };
});

undoButton.addEventListener("click", undo);

/* Redo function

Defining the function which handles the redo event.

We "push" the actual drawing state to the drawingStates Array so that we have a state to undo to, if needed;

We check if we have redoStates to Redo to (one gets added each time the Undo event is triggered);

We are importing the previous state (-1) as an img at 0,0 coordinates, however this time around we clear the canvas inside the img;

Finally, we are "popping" the latest Redo state from the redoStates Array.

We have the two ways to call the event (one is present on the UI and the other one is the combination of CTRL + "x" for Windows or CMD + "x" for MacOS).

*/

function redo() {
    drawingStates.push(canvas.toDataURL());
    if (redoStates.length > 0) {
        const img = new Image();
        img.src = redoStates.pop();
        img.addEventListener("load", () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
        });
    };
};

window.addEventListener("keydown", (ev) => {
    if (drawingStateNumber > checkStateNumber) {
        redoStates = [];
    } else if (ev.key === "y" && ev.ctrlKey) {
        redo();
    } else if (ev.metaKey === "y" && ev.ctrlKey) {
        redo();
    };
});

redoButton.addEventListener("click", () => {
    if (drawingStateNumber > checkStateNumber) {
        redoStates = [];
    } else {
        redo();
    };
});

/* Increase the width of the shape with a keyboard combination

Defining the function that handles the event which increases the lineWidth of out pen/shape.
The event is called upon pressing CTRL + " [ " for Windows or CMD + "[" for MacOS.

*/

function increaseSize(ev) {
    if (context.lineWidth === 25) {
        return
    } else if (ev.key === "[" && ev.ctrlKey) {
        context.lineWidth += 1;
    } else if (ev.key === "[" && ev.metaKey) {
        context.lineWidth += 1;
    };
    strokeSize.value = context.lineWidth;
};

window.addEventListener("keydown",increaseSize);

/* Decrease the width of the shape with a keyboard combination

Defining the function that handles the event which decreases the lineWidth of out pen/shape.
The event is called upon pressing CTRL + " ] " for Windows or CMD + "]" for MacOS.

*/

function decreaseSize(ev) {
    if (context.lineWidth === 1) {
        return
    } else if (ev.key === "]" && ev.ctrlKey) {
        context.lineWidth -= 1;
    } else if (ev.key === "]" && ev.metaKey) {
        context.lineWidth -= 1;
    };
    strokeSize.value = context.lineWidth;
};

window.addEventListener("keydown", decreaseSize);

/* Help Dialog Box

Define the helpDialog function which handles the appearance and dissaperance of the box containg helpful information;

The function adds the "active" class if the button is pressed;

We also have a function that check whether a click event has happened on the button or on not, and then removes the "active" class from the Help Dialog Box, if the target was not the button.

*/

function helpDialog() {
    dialogBox.classList.toggle("active");
};

helpButton.addEventListener("click", helpDialog);
   
window.addEventListener("click", (e) => {
    if(e.target !== helpButton && dialogBox.classList.contains("active")) {
        dialogBox.classList.remove("active");
    };
});
