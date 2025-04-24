


function longestEvenWord(sentence: string): string {

    return sentence.length ? sentence.split(" ").filter((s) => s.length % 2 === 0 ).sort((a,b) => b.length - a.length)[0] : ""
}


console.log(longestEvenWord("You are even better than me"))//better
console.log(longestEvenWord("")) //""
console.log(longestEvenWord("You are nice")) //nice
console.log(longestEvenWord("You")) //nice