//Sample tag object for referencing later
var thing = {
    tag: "sample",
    emphasis: 0 //negative values for [], positive for ()
}



class PromptMerge {
    newlineTag = "{{{{newlineUsed}}}}";
    emphasisRegexString = "[\(|\[]";
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
                    tag: this.newlineTag,
                    emphasis: 0
                })
                continue;
            }
            trimstr = tagArr[i].trim()
            if(trimstr !== ""){
                tempo = {
                    tag: this.removeEmphasisCharacters(trimstr), //trim excess spaces from name
                    emphasis: this.getEmphasisLevel(trimstr) //negative values for [], positive for ()
                }
                otArr.push(tempo)
            }
        }
        return otArr;
    }

    removeEmphasisCharacters(str){
        var reg = new RegExp(this.emphasisRegexString, "g")
        return str.replaceAll(reg,"");
    }

    getEmphasisLevel(instr){
        instr = instr || "";
        var reg = new RegExp(this.emphasisRegexString)
        var matches =instr.match(reg, "g");
        debugger;
        var count = (matches || []).length;
        if((matches || []).length > 0 && matches[0] === "["){
            count = -count;
        }
        return count;
    }

    /* To help preserve array order, merge using an interleaving / interlacing method.
    * Generally this would be the most useful when the tag sets are very similar and
    * the smaller array is within 80% the size of the larger one. */
    mergeArrays(arr, arr2){
        var arrayCombined = arr.map(
            function(elem,i) {
                return [elem, arr2[i]]; }
        ).reduce(function(a,b) { return a.concat(b); });
    }



    processTagArray(arr){
        //Iterate through array, dedupe and process
        return arr.filter(function(elem, num, fullarr){
            return fullarr.findIndex(function(innerElem){
                return (innerElem.tag === elem.tag)
            }) === num;
        })
    }
}