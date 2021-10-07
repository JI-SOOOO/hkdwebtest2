

let myWidth = window.innerWidth;
let myHeight = window.innerHeight;

let myBox; // 안쪽 박스.
let unitBox; // 큰 박스.
let boxSize = 30;
let boxUnit = boxSize * 4;

var backgroundArr = [ '#f40025', '#2969ff', '#f7bd30', '#7fc600', '#ff6638', '#bb8b50', '#a04a49', '#8b1481', '#b2b6c1', '#0f4c80', '#00a0c9'];
let gifCorner = [[8, 13, 11], [4, 1, 7], [12, 3, 3, 0], [3, 3, 2, 2], [8, 12], [2, 3], [1], [1, 0], [1], [1], [3, 12, 8]];

//console.log(myBox[0]);

let boxIndex = []; // random color value index. 
let relativeId = [];
let boxRelativeIndex = [];


let tempBigBoxWidth;
let tempBigBoxHeight;
let totalBoxNum;

//window.addEventListener('resize', resizeInit);

let boxContainer = document.querySelector('#boxContainer');

function resizeInit()
{
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;

    tempBigBoxWidth = Math.floor( myWidth / boxUnit );
    tempBigBoxHeight = Math.floor( myHeight / boxUnit);

    //console.log(tempBigBoxWidth);
    //console.log(tempBigBoxHeight);

    totalBoxNum = tempBigBoxWidth * tempBigBoxHeight;
    
    let forDelete = boxContainer.childNodes;

    console.log(forDelete);
   // boxContainer.removeChild(forDelete[0]);

    /*
        for(let k = 0; k < forDelete.length; k++)
        {
            boxContainer.removeChild(forDelete[k]);
        }
*/
    drawBox();
    makeEvent();
}
resizeInit();


function drawBox()
{
    for(let i = 0; i < tempBigBoxHeight; i++)
    {
        for(let j = 0; j < tempBigBoxWidth; j++)
        {
            let tempColor = parseInt(Math.random() * backgroundArr.length);
            boxIndex.push(tempColor);
            let relativeIndex = parseInt(Math.random() * gifCorner[tempColor].length);
            relativeId.push(relativeIndex);
            let relativePos = gifCorner[tempColor][relativeIndex];
            boxRelativeIndex.push(relativePos);
            let tempBigBox = document.createElement('div');
            let tempBox = document.createElement('div');

            let tempUnitBoxPosX = j * boxUnit;
            let tempUnitBoxPosY = i * boxUnit;

            tempBigBox.setAttribute('class', 'unitBox');
            tempBigBox.style.width = boxUnit + 'px';
            tempBigBox.style.height = boxUnit + 'px';
           // tempBigBox.style.backgroundColor = '#ccc';
            tempBigBox.style.position = 'absolute';
            tempBigBox.style.display = 'block';
            tempBigBox.style.top = tempUnitBoxPosY + 'px';
            tempBigBox.style.left = tempUnitBoxPosX + 'px';
           // tempBigBox.style.border = 'solid 1px';

            let tempBoxX = (relativePos%4)*boxSize;
            let tempBoxY = Math.floor(relativePos/4)*boxSize;

            //tempBox.innerHTML = i*tempBigBoxWidth + j + ',' + relativePos;
            tempBox.setAttribute('class', 'demo');
            tempBox.setAttribute('index', boxIndex.length -1);
            tempBox.style.position = 'absolute';
            tempBox.style.display = 'block';
            tempBox.style.width = boxSize +'px';
            tempBox.style.height = boxSize +'px';
            tempBox.style.top = tempBoxY +'px';
            tempBox.style.left =tempBoxX +'px';
            tempBox.style.backgroundColor = backgroundArr[tempColor];  

            tempBigBox.appendChild(tempBox);

            boxContainer.appendChild(tempBigBox);
            //console.log( boxContainer.childNodes[i*tempBigBoxWidth + j] );
           // boxContainer.childNodes[i*tempBigBoxWidth + j].appendChild(tempBox);

        }
    }
}

function makeEvent()
{
    myBox = document.querySelectorAll('.demo');
    unitBox = document.querySelectorAll('.unitBox');

    for(let j = 0; j < myBox.length; j++)
    {
        myBox[j].addEventListener('click', myClickFn);
        
        //console.log(myBox[j].getAttribute('index'));
    }
}

function myClickFn(e)
{
    boxReset();

   // console.log(e);
    e.path[0].style.visibility = 'hidden';
    let tempId = e.path[0].getAttribute('index');
    //console.log(tempId);
    let tempColorId = boxIndex[tempId];

    let sameColorNum = 0;

    console.log(myBox.length);
    for(let i = 0; i < myBox.length; i++)
    {
        tempId = myBox[i].getAttribute('index');
        //console.log(tempId);
        //console.log(tempColorId);
        if(tempColorId == boxIndex[tempId])
        {
            //sameColorNum++;
            console.log("같은 색이에요!!!");
            unitBox[i].style.backgroundImage = 'url(assets/images/gif/' +tempColorId+ '_'+ relativeId[tempId] + '.gif)';
            unitBox[i].style.backgroundSize = 'contain';
            myBox[i].style.visibility = 'hidden';
        }
    }
}

function boxReset()
{

    for(let t = 0; t < myBox.length; t++)
    {
        myBox[t].style.visibility = 'visible';
        unitBox[t].style.backgroundImage = 'none';
    }
}

/*

for(let i = 0; i < myBox.length; i++)
{
    let tempTop = Math.random() * myHeight;
    let tempLeft = Math.random() * myWidth;
    let tempColor = parseInt(Math.random() * backgroundArr.length);
    myBox[i].style.top = tempTop + 
    myBox[i].style.left = tempLeft + 'px';
    myBox[i].style.backgroundColor = backgroundArr[tempColor];
    myBox[i].innerHTML = i;
    boxIndex.push(tempColor);
}

//console.log("diudididididi" + boxIndex[0]); 

for(let j = 0; j < myBox.length; j++)
{
    myBox[j].addEventListener('click', myClickFn);
    
    console.log(myBox[j].getAttribute('index'));
}



*/