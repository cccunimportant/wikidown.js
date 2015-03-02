// 原始程式來源: http://practicalcryptography.com/ciphers/enigma-cipher/ 網頁內的 javascript 程式碼

var c = console;

var plaintext = 'ABCDEF';
c.log('>> plaintext2 : '+plaintext);
var ciphertext = Encrypt(plaintext, 'AAA', 'AAA', '123', 'POMLIUKJNHYTGBVFREDC');
c.log('>> ciphertext : '+ciphertext);
var plaintext2  = Encrypt(ciphertext, 'AAA', 'AAA', '123', 'POMLIUKJNHYTGBVFREDC');
c.log('>> plaintext2 : '+plaintext);


function Encrypt(plaintext, keysettings, ringsettings, rotorsettings, plugboardsettings) {
    c.log('plaintext='+plaintext);
    c.log('keysetting='+keysettings);
    c.log('ringsetting='+ringsettings);
    c.log('plugboardsettings='+plugboardsettings+' len='+plugboardsettings.length);
    c.log('rotorsettings='+rotorsettings);
    // do some error checking
    if(plaintext.length < 1){ c.log("please enter some plaintext (letters and numbers only)"); return; }    
    if(keysettings.length != 3){ c.log("Key settings must consist of 3 uppercase characters."); return; }
    if(ringsettings.length != 3){ c.log("Ring settings must consist of 3 uppercase characters."); return; }
    if(plugboardsettings.length > 26){ c.log("There cannot be more than 13 pairs in the plugboard settings."); return; }
    if(plugboardsettings.length % 2 != 0){ c.log("There must be an even number of characters in the plugboard settings."); return; }
    if(rotorsettings.length != 3){ c.log("Rotor settings must consist of 3 numbers 1-9."); return; }
    
    // interpret the rotor settings (strings 1-8 to int 0-7)
    var rotors = rotorsettings.split("");
    rotors[0]=rotors[0].valueOf()-1;rotors[1]=rotors[1].valueOf()-1;rotors[2]=rotors[2].valueOf()-1; 
    
    // parse plugboard settings, store as a simple substitution key
    var plugboard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var parr = plugboard.split("");
    for(i=0,j=1;i<plugboardsettings.length;i+=2,j+=2){
	    ichar = plugboard.indexOf(plugboardsettings.charAt(i));
	    jchar = plugboard.indexOf(plugboardsettings.charAt(j));
	    temp = parr[jchar]; parr[jchar]=parr[ichar]; parr[ichar]=temp;
    }
    plugboard = parr.join("");
    
    // interpret key and ring settings (convert from letters to numbers 0-25)
    key=keysettings.split("");
    key[0]=code(key[0]); key[1]=code(key[1]); key[2]=code(key[2]);
    ring=ringsettings.split("");
    ring[0]=code(ring[0]); ring[1]=code(ring[1]); ring[2]=code(ring[2]);
    
    // do the actual enigma enciphering
    ciphertext = "";   
    for(i=0; i < plaintext.length; i++){
        ch=plaintext.charAt(i);
        
        // if the current character is not a letter, pass it through unchanged
        if(!ch.match(/[A-Z]/)){
            ciphertext = ciphertext + ch;
        }else{
            key=increment_settings(key,rotors);
            ciphertext = ciphertext + enigma(ch,key,rotors,ring,plugboard);
        }
    }
    c.log('ciphertext='+ciphertext);
    return ciphertext;
}

function enigma(ch,key,rotors,ring,plugboard){
	// apply plugboard transformation
	ch = simplesub(ch,plugboard);
	// apply rotor transformations from right to left
	ch = rotor(ch,rotors[2],key[2]-ring[2]);
	ch = rotor(ch,rotors[1],key[1]-ring[1]);
	ch = rotor(ch,rotors[0],key[0]-ring[0]);
	// use reflector B
	ch = simplesub(ch,"YRUHQSLDPXNGOKMIEBFZCWVJAT");
	// apply inverse rotor transformations from left to right
	ch = rotor(ch,rotors[0]+8,key[0]-ring[0]);
	ch = rotor(ch,rotors[1]+8,key[1]-ring[1]);
	ch = rotor(ch,rotors[2]+8,key[2]-ring[2]);
	// apply plugboard transformation again
	ch = simplesub(ch,plugboard);
	return ch;
}


function increment_settings(key,r){
	//notch = [['Q','Q'],['E','E'],['V','V'],['J','J'],['Z','Z'],['Z','M'],['Z','M'],['Z','M']];
	// The notch array stores the positions at which each rotor kicks over the rotor to its left
	var notch = [[16,16],[4,4],[21,21],[9,9],[25,25],[25,12],[25,12],[25,12]];
	if(key[1] == notch[r[1]][0] || key[1] == notch[r[1]][1]){
        key[0] = (key[0]+1)%26;
        key[1] = (key[1]+1)%26;
    }    
    if(key[2] == notch[r[2]][0] || key[2] == notch[r[2]][1]){
        key[1] = (key[1]+1)%26;
    }
    key[2] = (key[2]+1)%26;   
	  return key;
}

// perform a simple substitution cipher
function simplesub(ch,key){
	  return key.charAt(code(ch));
}

function rotor(ch,r,offset){
	  // The first eight strings represent the rotor substitutions I through VIII. The second 8 are the 
	  //  inverse transformations
	  var key = ["EKMFLGDQVZNTOWYHXUSPAIBRCJ","AJDKSIRUXBLHWTMCQGZNPYFVOE","BDFHJLCPRTXVZNYEIWGAKMUSQO",
               "ESOVPZJAYQUIRHXLNFTGKDCMWB","VZBRGITYUPSDNHLXAWMJQOFECK","JPGVOUMFYQBENHZRDKASXLICTW",
               "NZJHGRCXMYSWBOUFAIVLPEKQDT","FKQHTLXOCBJSPDZRAMEWNIUYGV",
               // inverses
               "UWYGADFPVZBECKMTHXSLRINQOJ","AJPCZWRLFBDKOTYUQGENHXMIVS","TAGBPCSDQEUFVNZHYIXJWLRKOM",
               "HZWVARTNLGUPXQCEJMBSKDYOIF","QCYLXWENFTZOSMVJUDKGIARPHB","SKXQLHCNWARVGMEBJPTYFDZUIO",
               "QMGYVPEDRCWTIANUXFKZOSLHJB","QJINSAYDVKBFRUHMCPLEWZTGXO"];
     // the following code looks a bit horrible, but it is essentially just doing a simple substitution
     //  taking into account 16 possible keys (8 rotors and their inverses) and the offset (which is calculated
     //  from the indicator and ring settings). The offset essentially shifts the rotor key to the left or right
     var chcode = (code(ch)+26+offset)%26;
     var mapch = (code( key[r].charAt(chcode) ) +26-offset)%26 +65;
     return String.fromCharCode(mapch);
}

// return the number 0-25 given a letter [A-Za-z]
function code(ch){return ch.toUpperCase().charCodeAt(0) - 65;}
