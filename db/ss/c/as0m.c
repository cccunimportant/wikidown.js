#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define UINT16 unsigned short
#define MAX_LEN 100
#define WORD 0xFF
#define LD   0x0
#define ADD  0x1
#define JMP  0x2
#define ST   0x3
#define CMP  0x4
#define JEQ  0x5

typedef struct {
  char *name;
  int  value; 
} Pair;

int symTop = 0;
Pair symTable[1000];

int opTop  = 7;
Pair opTable[] = {{"WORD", WORD}, {"LD", LD}, {"ADD", ADD},
  {"JMP", JMP}, {"ST", ST}, {"CMP", CMP}, {"JEQ", JEQ}};

void parse(char *line, char *label, char *op, char *param) {
  if (sscanf(line, "%[^:]:%s %s", label, op, param)>=3) {
  } else if (sscanf(line, "%s %s", op, param)==2) {
    strcpy(label, "");
  }
}

Pair *table_get(Pair *table, int top, char *name) {
  int i;
  for (i=0; i<top; i++) {
    if (strcmp(name, table[i].name)==0)
      return &table[i];
  }
  return NULL;
}

int table_put(Pair *table, int *top, char *name, int value) {
  Pair *pair = table_get(table, *top, name);
  if (pair == NULL) {
    pair = &table[*top];
    pair->value = value;
    pair->name = strdup(name);
    (*top)++;
    return 1;
  } 
  return 0;
}

void pass1(char *filename) {
  printf("============== pass1 ===============\n");
  FILE *file = fopen(filename, "rt");
  char line[MAX_LEN], label[MAX_LEN], op[MAX_LEN], param[MAX_LEN];
  UINT16 address = 0;
  while (fgets(line, MAX_LEN, file)) {
    printf("%04x %s", address, line);
    parse(line, label, op, param);
    if (!strcmp(label, "")==0) {
      if (!table_put(symTable, &symTop, label, address)) {
        printf("Error: symbol %s duplicate\n", label);
        exit(1);
      }
    } 
    address += 2;
  }
  fclose(file);
}

UINT16 translate(char *label, char *op, char *param) {
  Pair *op1 = table_get(opTable, opTop, op);
  if (op == NULL) {
    printf("Error: op(%s) not found!\n", op);
    exit(0);
  }
  UINT16 code = 0;
  if (op1->value == WORD) {
    sscanf(param, "%hu", &code); 
  } else {
    Pair *sym = table_get(symTable, symTop, param);
    if (sym == NULL) {
      printf("Error: symbol(%s) not found!\n", param);
      exit(0);
    }
    UINT16 paddress = sym->value;
    code = (op1->value << 12)|paddress;
  }
  return code;
}

void pass2(char *filename) {
  printf("============== pass2 ===============\n");
  FILE *file = fopen(filename, "rt");
  char line[MAX_LEN], label[MAX_LEN], op[MAX_LEN], param[MAX_LEN];
  UINT16 address = 0;
  while (fgets(line, MAX_LEN, file)) {
    parse(line, label, op, param);
    UINT16 code = translate(label, op, param);
    printf("%04x %04x %s", address, code, line);
    address += 2;
  }
  fclose(file);
}

int main(int argc, char *argv[]) {
  char *filename=argv[1];
  pass1(filename);
  pass2(filename);
}
