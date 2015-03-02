/* author: James Lyons
Aug 2012
use e.g. http://practicalcryptography.com/ciphers/mechanical-era/enigma/ to generate messages
this code is from http://www.practicalcryptography.com/cryptanalysis/breaking-machine-ciphers/cryptanalysis-enigma-part-2/
*/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include "NBestList2.h"
#include "scoreText2.h"


EnigmaKey *break_enigma(char* ctext);
float entropy_score(char *text);

// cipher text variable must be all capitals, with no spacing or punctuation, use e.g. http://practicalcryptography.com/ciphers/mechanical-era/enigma/
// to generate messages. This version can break messages with plugs, but both the original plaintext and corresponding ciphertext are required.
// This program determines the key used. 'otext' is the original plaintext, 'ctext' is the ciphertext
char otext[] = "THEENIGMACIPHERWASAFIELDCIPHERUSEDBYTHEGERMANSDURINGWORLDWARIITHEENIGMAISONEOFTHEBETTERKNOWNHISTORICALENCRYPTIONMACHINESANDITACTUALLYREFERSTOARANGEOFSIMILARCIPHERMACHINES";
char ctext[] = "YXBMXADQBDBAAYIMKDODAYIXNBDQZFJKOLFVEEQBCLUUXDFVQYGKEYBVRHONJKPJMKUNLYLZUKBKJOAJTWVWMOMDPGVXEPUKXBVSGHROFOSBCNKEHEHAKWKOGWTBZFXSYCGSUUPPIZTRTFVCXZVCXTFLMTPTAQVMREGWSBFZBM";
    
/******************************************************************
main - cracks the enigma ciphertext stored in ctext, prints the result.
*******************************************************************/
int main(int argc, char *argv[]){
    char *ptext = malloc(sizeof(char)*(strlen(ctext)+1));
    EnigmaKey *ref;
    ref = break_enigma(ctext);
    printf("final key: \n");
    printEnigmaKey(ref);
    enigma(ref,ctext,ptext);        
    printf("decryption: %s\n",ptext);
    free(ptext); 
    free(ref);
}

// All possible permutations of 5 rotors, there are 60 total
int perms[60][3] = {{ 1 , 2 , 3 }, { 1 , 2 , 4 }, { 1 , 2 , 5 }, { 1 , 3 , 2 }, { 1 , 3 , 4 }, { 1 , 3 , 5 }, { 1 , 4 , 2 }, { 1 , 4 , 3 }, { 1 , 4 , 5 }, { 1 , 5 , 2 }, { 1 , 5 , 3 }, { 1 , 5 , 4 }, { 2 , 1 , 3 }, { 2 , 1 , 4 }, { 2 , 1 , 5 }, { 2 , 3 , 1 }, { 2 , 3 , 4 }, { 2 , 3 , 5 }, { 2 , 4 , 1 }, { 2 , 4 , 3 }, { 2 , 4 , 5 }, { 2 , 5 , 1 }, { 2 , 5 , 3 }, { 2 , 5 , 4 }, { 3 , 1 , 2 }, { 3 , 1 , 4 }, { 3 , 1 , 5 }, { 3 , 2 , 1 }, { 3 , 2 , 4 }, { 3 , 2 , 5 }, { 3 , 4 , 1 }, { 3 , 4 , 2 }, { 3 , 4 , 5 }, { 3 , 5 , 1 }, { 3 , 5 , 2 }, { 3 , 5 , 4 }, { 4 , 1 , 2 }, { 4 , 1 , 3 }, { 4 , 1 , 5 }, { 4 , 2 , 1 }, { 4 , 2 , 3 }, { 4 , 2 , 5 }, { 4 , 3 , 1 }, { 4 , 3 , 2 }, { 4 , 3 , 5 }, { 4 , 5 , 1 }, { 4 , 5 , 2 }, { 4 , 5 , 3 }, { 5 , 1 , 2 }, { 5 , 1 , 3 }, { 5 , 1 , 4 }, { 5 , 2 , 1 }, { 5 , 2 , 3 }, { 5 , 2 , 4 }, { 5 , 3 , 1 }, { 5 , 3 , 2 }, { 5 , 3 , 4 }, { 5 , 4 , 1 }, { 5 , 4 , 2 }, { 5 , 4 , 3 }};

NBestList *base = NULL;

/******************************************************************
Given a piece of ciphertext 'ctext', return the enigma decryption key
- assumes enigma M3 with unchangeable reflector, 3 rotors from 5 to choose from
******************************************************************/
EnigmaKey *break_enigma(char* ctext){
    int i,j;
    char *ptext = malloc(sizeof(char)*(strlen(ctext)+1));
    EnigmaKey key;
    EnigmaKey *bestkey = malloc(sizeof(EnigmaKey));
    EnigmaKey store;
    char ind1,ind2,ind3,set1,set2,set3;
    float bestscore,score;
    initEnigmaKey(bestkey);
    printf("searching for rotors: ");
    for(i=0;i<60;i++){
        for(ind1=0;ind1<26;ind1++){
            for(ind2=0;ind2<26;ind2++){
                for(ind3=0;ind3<26;ind3++){
                    key = *bestkey;
                    key.rotors[0] = perms[i][0]-1;
                    key.rotors[1] = perms[i][1]-1;
                    key.rotors[2] = perms[i][2]-1;
                    key.indicator[0] = ind1;            
                    key.indicator[1] = ind2;        
                    key.indicator[2] = ind3;
                    store = key; enigma(&store,ctext,ptext);
                    score = -scoreTextKP(ptext,otext,strlen(ptext));
                    base = nbest_add(base,&key,score);
                }
            }
        }
        printf("."); fflush(stdout);
    }
    // we have the optimal indicators and rotors, search for the optimal ringsettings
    printf("\nsearching ring settings: .");
    EnigmaKey *currentkey;
    NBestList *elem;
    bestscore = 99e99;    
    for(elem = base; elem != NULL; elem = elem->next){
        currentkey = &(elem->key);
        ind2 = currentkey->indicator[1];
        ind3 = currentkey->indicator[2];
        for(set2=0; set2<26;set2++){
            for(set3=0; set3<26;set3++){
                key = *currentkey;
                key.ringsettings[0] = 0;
                key.ringsettings[1] = set2;
                key.ringsettings[2] = set3;
                key.indicator[1] = (set2+ind2)%26;
                key.indicator[2] = (set3+ind3)%26;
                store = key; enigma(&store,ctext,ptext);
                score = -scoreTextKP(ptext,otext,strlen(ptext));
                if(score < bestscore){
                    bestscore = score;
                    *bestkey = key;
                }
            }
        }
    }
    // we have the indicators, rotors and ringsettings. Solve for the plugboard
    char alphabet[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    char first;
    char *rest;
    for(i=0;i<25;i++){
        first = alphabet[i];
        rest = &alphabet[i+1];
        for(j=0;j<25-i;j++){
            store = *bestkey;
            appendToPlugboard(&store,first,rest[j]);
            enigma(&store,ctext,ptext);
            score = -scoreTextKP(ptext,otext,strlen(ptext));
            if(score < bestscore){
                bestscore = score;
                appendToPlugboard(bestkey,first,rest[j]);
            }
        }
    }
    printf(".\n");
    free(ptext);
    freeList(base);
    return bestkey;
}


