const white_p = document.querySelectorAll(".whitep");
const black_p = document.querySelectorAll(".blackp");

const rows = table.rows;

//chance of white piece
function white_p_chance() {
    for (let piece of black_p) {
        piece.draggable = false;
    }
    for (let piece of white_p) {
        piece.draggable = true;
    }
}
//chance of black piece
function black_p_chance() {
    for (let piece of white_p) {
        piece.draggable = false;
    }
    for (let piece of black_p) {
        piece.draggable = true;
    }
}
function chance_check() {

    switch (chance) {
        case "white": chance = "black";
            black_p_chance();
            break;

        case "black": chance = "white";
            white_p_chance();
            break;
    }
}
//giving first chance to white
let chance = "white";
white_p_chance();

let rule = false;
let king_w_checked = false;
let king_b_checked = false;

function rules(e) {
    switch (chance) {
        case "white":
            white_rules(e);
            break;
        case "black":
            black_rules(e);
            break;
    }
}

function white_rules(e) {
    if (e.currentTarget == selectedPiece.parentNode) {
        return;
    }
    if (e.currentTarget.childNodes[0] != null) {
        if (e.currentTarget.childNodes[0].className == selectedPiece.className) {
            return;
        }
    }
    const to = parseInt(e.currentTarget.id);
    const from = parseInt(selectedPiece.parentNode.id);
    switch (selectedPiece.id) {
        case "pawn-w":
            pawn_w(to, from, e);
            break;
        case "rook-w":
            rook(to, from);
            break;
        case "knight-w":
            knight(to, from);
            break;
        case "bishop-w":
            bishop(to, from);
            break;
        case "queen-w":
            queen(to, from);
            break;
        case "king-w":
            king(to, from);
            break;
    }
}
function black_rules(e) {
    if (e.currentTarget == selectedPiece.parentNode) {
        return;
    }
    if (e.currentTarget.childNodes[0] != null) {
        if (e.currentTarget.childNodes[0].className == selectedPiece.className) {
            return;
        }
    }
    const to = parseInt(e.currentTarget.id);
    const from = parseInt(selectedPiece.parentNode.id);
    switch (selectedPiece.id) {
        case "pawn-b":
            pawn_b(to, from, e);
            break;
        case "rook-b":
            rook(to, from);
            break;
        case "knight-b":
            knight(to, from);
            break;
        case "bishop-b":
            bishop(to, from);
            break;
        case "queen-b":
            queen(to, from);
            break;
        case "king-b":
            king(to, from);
            break;
    }
}

function pawn_w(to, from, e) {
    const dx = Math.abs((to % 8) - (from % 8));
    const dy = Math.floor(to / 8) - Math.floor(from / 8);
    const from_row = Math.floor(from / 8);
    const to_row = Math.floor(to / 8);
    const from_col = Math.floor(from % 8);
    const to_col = Math.floor(to % 8);
    if (dy == 1 && dx == 0) {

        if (e.currentTarget.childNodes[0] == null) {
            if (to_row == 7) {
                upgrade(e);
            }
            rule = true;
        }
    }
    if (from_row == 1) {
        if (dy == 2 && dx == 0) {
            if (e.currentTarget.childNodes[0] == null) {
                rule = true;
            }
        }
    }
    if (dx === 1 && dy === 1) {
        if (e.currentTarget.childNodes[0] != null) {
            if (e.currentTarget.childNodes[0].className != selectedPiece.className) {
                if (to_row == 7) {
                    upgrade(e);
                }
                rule = true
            }
        }
    }
}

function pawn_b(to, from, e) {
    const dx = Math.abs((from % 8) - (to % 8));
    const dy = Math.floor(from / 8) - Math.floor(to / 8);
    const from_row = Math.floor(from / 8);
    const to_row = Math.floor(to / 8);
    const from_col = Math.floor(from % 8);
    const to_col = Math.floor(to % 8);
    if (dy == 1 && dx == 0) {
        if (to_row == 7) {

        }
        if (e.currentTarget.childNodes[0] == null) {
            rule = true;
        }
    }
    if (from_row == 6) {
        if (dy == 2 && dx == 0) {
            if (e.currentTarget.childNodes[0] == null) {
                rule = true;
            }
        }
    }
    if (dx === 1 && dy === 1) {
        if (e.currentTarget.childNodes[0] != null) {
            if (e.currentTarget.childNodes[0].className != selectedPiece.className) {
                rule = true
            }
        }
    }
}

function rook(to, from) {
    const dx = Math.abs((from % 8) - (to % 8));
    const dy = Math.abs(Math.floor(from / 8) - Math.floor(to / 8));
    const from_row = Math.min(Math.floor(from / 8), Math.floor(to / 8));
    const to_row = Math.max(Math.floor(from / 8), Math.floor(to / 8));
    const from_col = Math.min(Math.floor(from % 8), Math.floor(to % 8));
    const to_col = Math.max(Math.floor(from % 8), Math.floor(to % 8));
    if (dy == 0) {
        const row = rows[from_row];
        const cells = row.cells;
        for (let i = from_col + 1; i < to_col; i++) {
            if (cells[i].childNodes.length != 0) {
                return;
            }
        }
        rule = true;
    }
    else if (dx == 0) {
        for (let i = from_row + 1; i < to_row; i++) {
            if (rows[i].cells[from_col].childNodes.length != 0) {
                return;
            }
        }
        rule = true;
    }
}

function knight(to, from) {
    const dx = Math.abs((from % 8) - (to % 8));
    const dy = Math.abs(Math.floor(from / 8) - Math.floor(to / 8));
    if (dx * dy === 2) { rule = true; }
}

function bishop(to, from) {
    const dx = Math.abs((from % 8) - (to % 8));
    const dy = Math.abs(Math.floor(from / 8) - Math.floor(to / 8));
    const from_row = Math.floor(from / 8);
    const to_row = Math.floor(to / 8);
    const from_col = Math.floor(from % 8);
    const to_col = Math.floor(to % 8);
    const diff_row = from_row < to_row ? 1 : -1;
    const diff_col = from_col < to_col ? 1 : -1;
    if (dx == dy) {
        let i = from_row + diff_row;
        let j = from_col + diff_col;
        while (i != to_row && j != to_col) {
            if (table.rows[i].cells[j].childNodes.length != 0) {
                return;
            }
            i += diff_row;
            j += diff_col;
        }
        rule = true;
    }
}

function queen(to, from) {
    bishop(to, from);
    rook(to, from);
}

function king(to, from) {
    const dx = Math.abs((from % 8) - (to % 8));
    const dy = Math.abs(Math.floor(from / 8) - Math.floor(to / 8));
    if (dx <= 1 && dy <= 1) {
        rule = true;
    }
}

let white_occupied_places = [];
let black_occupied_places = [];

function checking_white_occupancy() {
    white_occupied_places = [];
    const white_p = document.querySelectorAll(".whitep");
    white_p.forEach((element) => {
        switch (element.id) {
            case "pawn-w":
                pawn_w_occupy(element);
                break;
            case "rook-w":
                rook_w_occupy(element);
                break;
            case "knight-w":
                knight_w_occupy(element);
                break;
            case "bishop-w":
                bishop_w_occupy(element);
                break;
            case "queen-w":
                queen_w_occupy(element);
                break;
            case "king-w":
                king_w_occupy(element);
                break;
        }

    });
    console.log(white_occupied_places);

}

function white_array_push(element) {
    if (!white_occupied_places.includes(element)) {
        white_occupied_places.push(element);
    }
}

function pawn_w_occupy(element) {
    const id = parseInt(element.parentNode.id);
    const row = Math.floor(id / 8);
    const col = Math.floor(id % 8);
    if ((col - 1) >= 0)
        white_array_push((col - 1) + (row + 1) * 8);
    if ((col + 1) < 8)
        white_array_push((col + 1) + (row + 1) * 8);
}

function rook_w_occupy(element) {
    const id = parseInt(element.parentNode.id);
    const row = Math.floor(id / 8);
    const col = Math.floor(id % 8);
    let from_row = row;
    let to_row = row;
    let from_col = col;
    let to_col = col;
    while (from_row > 0 && rows[from_row - 1].cells[col].childNodes.length === 0) {
        from_row--;
    }
    if (from_row > 0) {
        from_row--;
    }
    while (to_row < 7 && rows[to_row + 1].cells[col].childNodes.length === 0) {
        to_row++;
    }
    if (to_row < 7) {
        to_row++;
    }
    while (from_col > 0 && rows[row].cells[from_col - 1].childNodes.length === 0) {
        from_col--;
    }
    if (from_col > 0) {
        from_col--;
    }
    while (to_col < 7 && rows[row].cells[to_col + 1].childNodes.length === 0) {
        to_col++;
    }
    if (to_col < 7) {
        to_col++;
    }
    for (let i = from_row; i <= to_row; i++) {
        if (i != row) {
            white_array_push(i * 8 + col);
        }
    }
    for (let i = from_col; i <= to_col; i++) {
        if (i != col) {
            white_array_push(row * 8 + i);
        }
    }
}

function knight_w_occupy(element) {
    const id = parseInt(element.parentNode.id);
    const row = Math.floor(id / 8);
    const col = Math.floor(id % 8);
    if (row - 2 >= 0) {
        if (col - 1 >= 0)
            white_array_push((row - 2) * 8 + (col - 1));
        if (col + 1 < 8)
            white_array_push((row - 2) * 8 + (col + 1));
    }
    if (row + 2 < 8) {
        if (col - 1 >= 0)
            white_array_push((row + 2) * 8 + (col - 1));
        if (col + 1 < 8)
            white_array_push((row + 2) * 8 + (col + 1));
    }
    if (col - 2 >= 0) {
        if (row - 1 >= 0)
            white_array_push((row - 1) * 8 + (col - 2));
        if (row + 1 < 8)
            white_array_push((row + 1) * 8 + (col - 2));
    }
    if (col + 2 < 8) {
        if (row - 1 >= 0)
            white_array_push((row - 1) * 8 + (col + 2));
        if (row + 1 < 8)
            white_array_push((row + 1) * 8 + (col + 2));
    }
}

function bishop_w_occupy(element) {
    const id = parseInt(element.parentNode.id);
    const row = Math.floor(id / 8);
    const col = Math.floor(id % 8);
    let start_diag_1 = [row, col];
    let end_diag_1 = [row, col];
    let start_diag_2 = [row, col];
    let end_diag_2 = [row, col];
    while (start_diag_1[0] > 0 && start_diag_1[1] > 0 && rows[start_diag_1[0] - 1].cells[start_diag_1[1] - 1].childNodes.length === 0) {
        start_diag_1[0]--;
        start_diag_1[1]--;
    }
    if (start_diag_1[0] > 0 && start_diag_1[1] > 0) {
        start_diag_1[0]--;
        start_diag_1[1]--;
    }
    while (end_diag_1[0] < 7 && end_diag_1[1] < 7 && rows[end_diag_1[0] + 1].cells[end_diag_1[1] + 1].childNodes.length === 0) {
        end_diag_1[0]++;
        end_diag_1[1]++;
    }
    if (end_diag_1[0] < 7 && end_diag_1[1] < 7) {
        end_diag_1[0]++;
        end_diag_1[1]++;
    }
    while (start_diag_2[0] > 0 && start_diag_2[1] < 7 && rows[start_diag_2[0] - 1].cells[start_diag_2[1] + 1].childNodes.length === 0) {
        start_diag_2[0]--;
        start_diag_2[1]++;
    }
    if (start_diag_2[0] > 0 && start_diag_2[1] < 7) {
        start_diag_2[0]--;
        start_diag_2[1]++;
    }
    while (end_diag_2[0] < 7 && end_diag_2[1] > 0 && rows[end_diag_2[0] + 1].cells[end_diag_2[1] - 1].childNodes.length === 0) {
        end_diag_2[0]++;
        end_diag_2[1]--;
    }
    if (end_diag_2[0] < 7 && end_diag_2[1] > 0) {
        end_diag_2[0]++;
        end_diag_2[1]--;
    }
    let i = start_diag_1[0];
    let j = start_diag_1[1];
    while (i <= end_diag_1[0] && j <= end_diag_1[1]) {
        if (i != row) {
            white_array_push(i * 8 + j);
        }
        i++;
        j++;
    }
    i = start_diag_2[0];
    j = start_diag_2[1];
    while (i <= end_diag_2[0] && j >= end_diag_2[1]) {
        if (i != row) {
            white_array_push(i * 8 + j);
        }
        i++;
        j--;
    }

}

function queen_w_occupy(element) {
    rook_w_occupy(element);
    bishop_w_occupy(element);
}

function king_w_occupy(element) {
    const id = parseInt(element.parentNode.id);
    const row = Math.floor(id / 8);
    const col = Math.floor(id % 8);

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && j >= 0 && i < 8 && j < 8) {
                if (i != row || j != col) {
                    white_array_push(i * 8 + j);
                }
            }
        }
    }
}


function checking_black_occupancy() {
    black_occupied_places = [];
    const black_p = document.querySelectorAll(".blackp");
    black_p.forEach((element) => {
        switch (element.id) {
            case "pawn-b":
                pawn_b_occupy(element);
                break;
            case "rook-b":
                rook_b_occupy(element);
                break;
            case "knight-b":
                knight_b_occupy(element);
                break;
            case "bishop-b":
                bishop_b_occupy(element);
                break;
            case "queen-b":
                queen_b_occupy(element);
                break;
            case "king-b":
                king_b_occupy(element);
                break;
        }

    });
    console.log(black_occupied_places);

}

function black_array_push(element) {
    if (!black_occupied_places.includes(element)) {
        black_occupied_places.push(element);
    }
}

function pawn_b_occupy(element) {
    const id = parseInt(element.parentNode.id);
    const row = Math.floor(id / 8);
    const col = Math.floor(id % 8);
    if ((col - 1) >= 0)
        black_array_push((col - 1) + (row + 1) * 8);
    if ((col + 1) < 8)
        black_array_push((col + 1) + (row + 1) * 8);
}

function rook_b_occupy(element) {
    const id = parseInt(element.parentNode.id);
    const row = Math.floor(id / 8);
    const col = Math.floor(id % 8);
    let from_row = row;
    let to_row = row;
    let from_col = col;
    let to_col = col;
    while (from_row > 0 && rows[from_row - 1].cells[col].childNodes.length === 0) {
        from_row--;
    }
    if (from_row > 0) {
        from_row--;
    }
    while (to_row < 7 && rows[to_row + 1].cells[col].childNodes.length === 0) {
        to_row++;
    }
    if (to_row < 7) {
        to_row++;
    }
    while (from_col > 0 && rows[row].cells[from_col - 1].childNodes.length === 0) {
        from_col--;
    }
    if (from_col > 0) {
        from_col--;
    }
    while (to_col < 7 && rows[row].cells[to_col + 1].childNodes.length === 0) {
        to_col++;
    }
    if (to_col < 7) {
        to_col++;
    }

    for (let i = from_row; i <= to_row; i++) {
        if (i != row) {
            black_array_push(i * 8 + col);
        }
    }
    for (let i = from_col; i <= to_col; i++) {
        if (i != col) {
            black_array_push(row * 8 + i);
        }
    }
}

function knight_b_occupy(element) {
    const id = parseInt(element.parentNode.id);
    const row = Math.floor(id / 8);
    const col = Math.floor(id % 8);
    if (row - 2 >= 0) {
        if (col - 1 >= 0)
            black_array_push((row - 2) * 8 + (col - 1));
        if (col + 1 < 8)
            black_array_push((row - 2) * 8 + (col + 1));
    }
    if (row + 2 < 8) {
        if (col - 1 >= 0)
            black_array_push((row + 2) * 8 + (col - 1));
        if (col + 1 < 8)
            black_array_push((row + 2) * 8 + (col + 1));
    }
    if (col - 2 >= 0) {
        if (row - 1 >= 0)
            black_array_push((row - 1) * 8 + (col - 2));
        if (row + 1 < 8)
            black_array_push((row + 1) * 8 + (col - 2));
    }
    if (col + 2 < 8) {
        if (row - 1 >= 0)
            black_array_push((row - 1) * 8 + (col + 2));
        if (row + 1 < 8)
            black_array_push((row + 1) * 8 + (col + 2));
    }
}

function bishop_b_occupy(element) {
    const id = parseInt(element.parentNode.id);
    const row = Math.floor(id / 8);
    const col = Math.floor(id % 8);
    let start_diag_1 = [row, col];
    let end_diag_1 = [row, col];
    let start_diag_2 = [row, col];
    let end_diag_2 = [row, col];
    while (start_diag_1[0] > 0 && start_diag_1[1] > 0 && rows[start_diag_1[0] - 1].cells[start_diag_1[1] - 1].childNodes.length === 0) {
        start_diag_1[0]--;
        start_diag_1[1]--;
    }
    if (start_diag_1[0] > 0 && start_diag_1[1] > 0) {
        start_diag_1[0]--;
        start_diag_1[1]--;
    }
    while (end_diag_1[0] < 7 && end_diag_1[1] < 7 && rows[end_diag_1[0] + 1].cells[end_diag_1[1] + 1].childNodes.length === 0) {
        end_diag_1[0]++;
        end_diag_1[1]++;
    }
    if (end_diag_1[0] < 7 && end_diag_1[1] < 7) {
        end_diag_1[0]++;
        end_diag_1[1]++;
    }
    while (start_diag_2[0] > 0 && start_diag_2[1] < 7 && rows[start_diag_2[0] - 1].cells[start_diag_2[1] + 1].childNodes.length === 0) {
        start_diag_2[0]--;
        start_diag_2[1]++;
    }
    if (start_diag_2[0] > 0 && start_diag_2[1] < 7) {
        start_diag_2[0]--;
        start_diag_2[1]++;
    }
    while (end_diag_2[0] < 7 && end_diag_2[1] > 0 && rows[end_diag_2[0] + 1].cells[end_diag_2[1] - 1].childNodes.length === 0) {
        end_diag_2[0]++;
        end_diag_2[1]--;
    }
    if (end_diag_2[0] < 7 && end_diag_2[1] > 0) {
        end_diag_2[0]++;
        end_diag_2[1]--;
    }
    let i = start_diag_1[0];
    let j = start_diag_1[1];
    while (i <= end_diag_1[0] && j <= end_diag_1[1]) {
        if (i != row) {
            black_array_push(i * 8 + j);
        }
        i++;
        j++;
    }
    i = start_diag_2[0];
    j = start_diag_2[1];
    while (i <= end_diag_2[0] && j >= end_diag_2[1]) {
        if (i != row) {
            black_array_push(i * 8 + j);
        }
        i++;
        j--;
    }

}

function queen_b_occupy(element) {
    rook_b_occupy(element);
    bishop_b_occupy(element);
}

function king_b_occupy(element) {
    const id = parseInt(element.parentNode.id);
    const row = Math.floor(id / 8);
    const col = Math.floor(id % 8);
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && j >= 0 && i < 8 && j < 8) {
                if (i != row || j != col) {
                    black_array_push(i * 8 + j);
                }
            }
        }
    }
}


function checking_for_checks(prev_parent, current_child, parent) {
    king_w_check(prev_parent, current_child, parent);
    king_b_check(prev_parent, current_child, parent);
}

function king_w_check(prev_parent, current_child, parent) {
    const king_id = document.querySelector("#king-w");
    const id = parseInt(king_id.parentElement.id);
    if (black_occupied_places.includes(id)) {
        king_id.style.backgroundColor = "red";
        king_w_checked = true;
    }
    else {
        king_id.style.backgroundColor = "green";
        king_w_checked = false;
    }
    if (selectedPiece.className == "whitep" && king_w_checked) {
        prev_parent.appendChild(selectedPiece);
        if (current_child != null)
            parent.appendChild(current_child);
        chance_check();
        king_w_checked = false;
    }
}

function king_b_check(prev_parent, current_child, parent) {
    const king_id = document.querySelector("#king-b");
    const id = parseInt(king_id.parentElement.id);
    if (white_occupied_places.includes(id)) {
        king_id.style.backgroundColor = "red";
        king_b_checked = true;
    }
    else {
        king_id.style.backgroundColor = "green";
        king_b_checked = false;
    }
    console.log(selectedPiece.className);
    if (selectedPiece.className == "blackp" && king_b_checked) {
        prev_parent.appendChild(selectedPiece);
        if (current_child != null)
            parent.appendChild(current_child);
        chance_check();
        king_b_checked = false;
    }
}


const seletion_box = document.createElement("div");
seletion_box.id = "selection";

for (let i = 1; i <= 4; i++) {
    const option = document.createElement("div");
    option.className = "option";
    option.id = "option-" + `${i}`;
    const pieces_w = document.createElement('img');
    pieces_w.className = "whitep";
    const srcimg = function give_index(i) {
        let text;
        switch (i) {
            case 1: pieces_w.setAttribute('id', 'queen-w');
                return text = "../pieces-basic-svg/queen-w.svg";
            case 2: pieces_w.setAttribute('id', 'knight-w');
                return text = "../pieces-basic-svg/knight-w.svg";
            case 3: pieces_w.setAttribute('id', 'bishop-w');
                return text = "../pieces-basic-svg/bishop-w.svg";
            case 4: pieces_w.setAttribute('id', 'rook-w');
                return text = "../pieces-basic-svg/rook-w.svg";
        }
    }
    pieces_w.setAttribute('src', srcimg(i));
    pieces_w.draggable = false;
    pieces_w.style.width = "90px";
    option.appendChild(pieces_w);
    seletion_box.appendChild(option);
}

const all_options = document.querySelectorAll(".option");

for (let option of all_options) {
    option.addEventListener('click', (e) => {
        console.log(e.currentTarget.id)
        switch (e.currentTarget.id) {
            case "option-1":
                upgrade_piece = "queen";
                break;
            case "option-2":
                upgrade_piece = "knight";
                break;
            case "option-3":
                upgrade_piece = "bishop";
                break;
            case "option-4":
                upgrade_piece = "rook";
                break;
        }
        upgrade();
    })
}

function upgrade(e) {
    e.currentTarget.innerHTML = '';
    console.log("yes")
    e.currentTarget.appendChild(seletion_box);
    let pieces_w = document.createElement('img');
    pieces_w.className = "whitep";
    function srcimg(upgrade_piece) {
        let text;
        switch (upgrade_piece) {
            case "queen": pieces_w.setAttribute('id', 'queen-w');
                return text = "../pieces-basic-svg/queen-w.svg";
            case "knight": pieces_w.setAttribute('id', 'knight-w');
                return text = "../pieces-basic-svg/knight-w.svg";
            case "bishop": pieces_w.setAttribute('id', 'bishop-w');
                return text = "../pieces-basic-svg/bishop-w.svg";
            case "rook": pieces_w.setAttribute('id', 'rook-w');
                return text = "../pieces-basic-svg/rook-w.svg";
        }
    }
    pieces_w.setAttribute('src', srcimg(upgrade_piece));
    pieces_w.draggable = false;
    pieces_w.style.width = "90px";
    e.currentTarget.innerHTML = '';
    e.currentTarget.appendChild(pieces_w);
}