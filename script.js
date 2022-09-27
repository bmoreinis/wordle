var colors = ["b", "r", "y", "g", "c", "w"];
main() {
    createAnswer();
}

createAnswer() {
    var answer = [];
    let position = [];
    for (let i = 0; i <= 4; i++) {
        answer[position] = Math.floor(Math.random()*6);
        position++;
    }
    alert(answer)
}