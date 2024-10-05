export interface rawCharacterCodes {
    [key: string]: number;
}

export class textTransforms{
    rawCharacterCodes:rawCharacterCodes = {};
    constructor(){
        let rawCharacterCodes:rawCharacterCodes = {};
        this.rawCharacterCodes = this.setRawCharacters(rawCharacterCodes);
        console.log(rawCharacterCodes);
    }
    setRawCharacters(characters: rawCharacterCodes): rawCharacterCodes {
        characters["0"] = 0x7E;
        characters["1"] = 0x30;
        characters["2"] = 0x6D;
        characters["3"] = 0x79;
        characters["4"] = 0x33;
        characters["5"] = 0x5B;
        characters["6"] = 0x5F;
        characters["7"] = 0x70;
        characters["8"] = 0x7F;
        characters["9"] = 0x7B;
        characters["a"] = 0x77;
        characters["b"] = 0x1F;
        characters["c"] = 0x0D;
        characters["d"] = 0x3D;
        characters["e"] = 0x4F;
        characters["f"] = 0x47;
        characters["g"] = 0x5E;
        characters["h"] = 0x17;
        characters["i"] = 0x04;
        characters["j"] = 0x3C;
        characters["k"] = 0x57; // unusable
        characters["l"] = 0x0E;
        characters["m"] = 0x54; // unusable
        characters["n"] = 0x15;
        characters["o"] = 0x1D;
        characters["p"] = 0x67;
        characters["q"] = 0x73;
        characters["r"] = 0x05;
        characters["s"] = 0x5B;
        characters["t"] = 0x0F;
        characters["u"] = 0x1C;
        characters["v"] = 0x3A; // unusable
        characters["w"] = 0x2A; // unusable
        characters["x"] = 0x37; // unusable
        characters["y"] = 0x3B;
        characters["z"] = 0x6D;
        characters["-"] = 0x01;
        characters["_"] = 0x08;
        characters["."] = 0x08; // Copy of _
        characters["="] = 0x09;
        return characters; 
      }
      returnHexOfSingle(mySingle: string): number{
        console.log(typeof mySingle);
        console.log(this.rawCharacterCodes[mySingle]);
        console.log(this.rawCharacterCodes[""+mySingle+""])

        return this.rawCharacterCodes[mySingle]; 
      }
      transformStringToHexArray (longString: string): Array<number> {
        let temp = []
        longString = longString.toLowerCase();
        for (let i = 0; i < longString.length; i++) {
            console.log(longString.charAt(i));
            temp.push(this.returnHexOfSingle(longString.charAt(i)));
          } 
        return temp;
      }
    }


