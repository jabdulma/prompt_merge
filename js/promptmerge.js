//Sample tag object for referencing later
var thing = {
    tag: "sample",
    emphasis: 0 //negative values for [], positive for ()
}

class PromptMerge {
    static newlineTag = "{{{{newlineUsed}}}}";
    firstPrompt; //First Prompt
    secondPrompt; //Second Prompt
    negativePrompt;
    outPrompt;

    promptToObjectArray(instr) {
        var otArr = []; //Object tag array
        var tagArr = instr.split(/[,|\r\n|\r|\n]+/); //Match commans and newlines.
        var tempo = {}; //Temporary Object
        var trimstr = "";
        for(var i=0;i<tagArr.length;i++){
            if(tagArr[i].match(/\r\n|\r|\n/)){
                otArr.push({
                    tag: newlineTag,
                    emphasis: 0 //negative values for [], positive for ()
                })
                continue;
            }
            trimstr = tagArr[i].trim()
            tempo = {
                tag: trimstr, //trim excess spaces from name
                emphasis: this.getEmphasisLevel(trimstr)
            }
            otArr.push(tempo)
        }
        return otArr;
    }

    getEmphasisLevel(instr){
        instr = instr || "";
        var reg = /[\(|\[]/g;
        var matches =instr.match(reg);
        var count = (matches || []).length;
        if((matches || []).length > 0 && matches[0] === "["){
            count = -count;
        }
        return count;
    }
}