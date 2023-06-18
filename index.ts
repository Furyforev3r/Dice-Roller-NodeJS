import readline from 'readline';

function DiceRoller(diceOperation: string) {
    let finalReturn: any = {}
    let dicesSplit: Array<string> = diceOperation.split("+")
    let dicesToMod: Array<Array<Number>> = []
    dicesSplit.forEach((atualItem: string, index: number) => {
        if (atualItem.toLowerCase().includes("d")) {
            dicesToMod.push([index])
        } else {
            dicesToMod[dicesToMod.length-1].push(index)
        }
    })

    dicesToMod.forEach((atualIndex: Array<Number>, index: number) => {
        let diceObject: any = { info: "", results: [], mods: [], dicesSum: 0, dicesSumWMod: 0 }
        atualIndex.forEach((diceIndex: any) => {
            if (dicesSplit[diceIndex].toLowerCase().includes("d")) {
                let diceInfo = dicesSplit[diceIndex].split("d")
                let dice1: number = parseInt(diceInfo[0])
                let dice2: number = parseInt(diceInfo[1])
                let dicesResults: Array<number> = []
                diceObject.info = dicesSplit[diceIndex]
                for(var diceRolling: number = 0; diceRolling < dice1; diceRolling++) {
                    let diceValue: number = Math.floor(Math.random()*dice2)
                    dicesResults.push(diceValue)
                    diceObject.results = dicesResults
                }
            } else {
                diceObject.mods = [...diceObject.mods, parseInt(dicesSplit[diceIndex])]
            }
        })
        diceObject["dicesSum"] = diceObject["results"].reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
        diceObject["dicesSumWMod"] = diceObject["results"].reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)+diceObject["mods"].reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
        finalReturn[index] = diceObject
    })

    return finalReturn
}

const rl:any = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("Dices operation:\n- ", (dices: string) => {
    console.log(DiceRoller(dices))
})

