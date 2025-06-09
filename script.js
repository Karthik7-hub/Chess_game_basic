const game = document.querySelector("#game");
const board = document.createElement("div");
game.appendChild(board);
const table = document.createElement("table");
board.appendChild(table);

board.setAttribute("class", "board");
table.setAttribute("class", "myTable");
table.setAttribute("id", "myTable")
const n = 8;

//for creating squares boxs
for (let i = 0; i < n; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < n; j++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${i * 8 + j}`);
        const isEve = (i + j) % 2 === 0;
        cell.style.backgroundColor = `${isEve ? "#d6d6d6" : "#628076"}`;
        row.appendChild(cell);
    }
    table.appendChild(row);
}

//for placing default position of white pawns
for (let i = 0; i < n; i++) {
    const pawn_w = document.createElement('img');
    pawn_w.setAttribute('src', 'pieces-basic-svg/pawn-w.svg');
    pawn_w.className = "whitep";
    pawn_w.setAttribute('id', 'pawn-w');
    pawn_w.draggable = false;
    pawn_w.style.width = "70px";
    table.rows[1].cells[i].appendChild(pawn_w)
}

//for placing the remaining white pieces
for (let i = 0; i < n; i++) {
    const pieces_w = document.createElement('img');
    pieces_w.className = "whitep";
    const srcimg = function give_index(i) {
        let text;
        switch (i) {
            case 0: pieces_w.setAttribute('id', 'rook-w');
                return text = "pieces-basic-svg/rook-w.svg";
            case 1: pieces_w.setAttribute('id', 'knight-w');
                return text = "pieces-basic-svg/knight-w.svg";
            case 2: pieces_w.setAttribute('id', 'bishop-w');
                return text = "pieces-basic-svg/bishop-w.svg";
            case 3: pieces_w.setAttribute('id', 'king-w');
                return text = "pieces-basic-svg/king-w.svg";
            case 4: pieces_w.setAttribute('id', 'queen-w');
                return text = "pieces-basic-svg/queen-w.svg";
            case 5: pieces_w.setAttribute('id', 'bishop-w');
                return text = "pieces-basic-svg/bishop-w.svg";
            case 6: pieces_w.setAttribute('id', 'knight-w');
                return text = "pieces-basic-svg/knight-w.svg";
            case 7: pieces_w.setAttribute('id', 'rook-w');
                return text = "pieces-basic-svg/rook-w.svg";
        }
    }
    pieces_w.setAttribute('src', srcimg(i));
    pieces_w.draggable = false;
    pieces_w.style.width = "70px";
    table.rows[0].cells[i].appendChild(pieces_w)
}

//for placing default position of black pawns
for (let i = 0; i < n; i++) {
    const pawn_b = document.createElement('img');
    pawn_b.setAttribute('src', 'pieces-basic-svg/pawn-b.svg');
    pawn_b.className = "blackp";
    pawn_b.setAttribute('id', 'pawn-b');
    pawn_b.draggable = false;
    pawn_b.style.width = "70px";
    table.rows[6].cells[i].appendChild(pawn_b)
}

//for placing the remaining black pieces
for (let i = 0; i < n; i++) {
    const pieces_b = document.createElement('img');
    pieces_b.className = "blackp";
    const srcimg = function give_index(i) {
        let text;
        switch (i) {
            case 0: pieces_b.setAttribute('id', 'rook-b');
                return text = "pieces-basic-svg/rook-b.svg";
            case 1: pieces_b.setAttribute('id', 'knight-b');
                return text = "pieces-basic-svg/knight-b.svg";
            case 2: pieces_b.setAttribute('id', 'bishop-b');
                return text = "pieces-basic-svg/bishop-b.svg";
            case 3: pieces_b.setAttribute('id', 'king-b');
                return text = "pieces-basic-svg/king-b.svg";
            case 4: pieces_b.setAttribute('id', 'queen-b');
                return text = "pieces-basic-svg/queen-b.svg";
            case 5: pieces_b.setAttribute('id', 'bishop-b');
                return text = "pieces-basic-svg/bishop-b.svg";
            case 6: pieces_b.setAttribute('id', 'knight-b');
                return text = "pieces-basic-svg/knight-b.svg";
            case 7: pieces_b.setAttribute('id', 'rook-b');
                return text = "pieces-basic-svg/rook-b.svg";
        }
    }
    pieces_b.setAttribute('src', srcimg(i));
    pieces_b.draggable = false;
    pieces_b.style.width = "70px";
    table.rows[7].cells[i].appendChild(pieces_b)
}

const imgss = document.querySelectorAll('img');
const Positions = document.querySelectorAll('td');

let selectedPiece;

//event listener for imgs
for (let imgs of imgss) {
    let imgclass = imgs.className;
    imgs.addEventListener('dragstart', (e) => {
        selectedPiece = imgs;
    });
    imgs.addEventListener('dragend', (e) => {
        e.target.className = imgclass;
    });
}


//event listeners over squares boxs
for (let Position of Positions) {

    Position.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    Position.addEventListener('dragenter', (e) => {

    });
    Position.addEventListener('dragleave', (e) => {

    });
    Position.addEventListener('drop', (e) => {
        e.preventDefault();
        rules(e);
        const current_parent = selectedPiece.parentNode;
        const piece_in_drop = e.currentTarget.childNodes[0];
        console.log(piece_in_drop);
        if (rule) {
            e.currentTarget.innerHTML = '';
            e.currentTarget.appendChild(selectedPiece);
            chance_check();
            checking_white_occupancy();
            checking_black_occupancy();
            checking_for_checks(current_parent, piece_in_drop, e.currentTarget);
            rule = false;
        }
    });
}

// // window.addEventListener()
// window.addEventListener('resize', function () {
//     if (this.window.innerWidth <= 850)
//         zoomReset(this.window.innerWidth / 850);
//     else {
//         zoomReset(1);
//     }
// })
function zoomReset(n) {
    document.body.style.zoom = 0.90 * n;
}
if (this.window.innerWidth <= 850)
    zoomReset(this.window.innerWidth / 850);
else {
    zoomReset(1);
}