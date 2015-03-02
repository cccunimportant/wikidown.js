/* author: James Lyons
Aug 2012
this code is from http://www.practicalcryptography.com/cryptanalysis/breaking-machine-ciphers/cryptanalysis-enigma-part-2/
*/
#include "scoreText2.h"

// scoreText with known plaintext, counts number of identical characters
double scoreTextKP(char *text1,char *text2,int len){
    int i;
    double score = 0;
    for (i=0;i<len;i++){
        if (text1[i] == text2[i]) score += 1;
    }
    return score;
}
