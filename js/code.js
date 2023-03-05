const pm = new PromptMerge();

document.querySelector("#mergeButton").addEventListener('click', function() {
    var prompt1 = document.getElementById("textarea1").value;
    var prompt2 = document.getElementById("textarea2").value;
    var negativePrompt = document.getElementById("textarean").value;

    var parr1 = pm.promptToObjectArray(prompt1);
    console.log(parr1);

    document.querySelector("#textarea3").value = JSON.stringify(parr1);
    //Update size - This isn't currently working?
    M.textareaAutoResize(document.querySelector("#textarea1"));
})
