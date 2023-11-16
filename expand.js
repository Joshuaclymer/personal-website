function expandText() {
    var textBox = document.getElementById('textBox');
    if(textBox.classList.contains('truncate')) {
        textBox.classList.remove('truncate');
        textBox.classList.add('expand');
    } else {
        textBox.classList.remove('expand');
        textBox.classList.add('truncate');
    }
}
