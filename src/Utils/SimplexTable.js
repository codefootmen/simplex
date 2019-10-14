class SimplexTable{


  calcPP(column, tableSimplex){
    let pp = [];
    tableSimplex.forEach(x => {
        if(x[column] != 0){
            let temp = x[x.length-1]/x[column];
            if (temp >= 0)
                pp.push(temp); 
            else
                pp.push(99999);
        }
    });

    let min = Math.min.apply(null, pp);
    
    if(min === 99999) {
        return -1;
    }
    
    pp.forEach((x, i) => {
        if(min === x){
            return i;   
        }
    });
  }

  selectColumn(f_objetiva){
    let min = Math.min.apply(null, f_objetiva);
    if(min < 0){
        f_objetiva.forEach((x, i) => {
            if(min === x){
                return i;
            }
        });
    }
  }

  resolveSimplex(table){
    let columnFocus;
    let lineFocus = 0;
    let z = table[table.length - 1];
    z.pop();

    if(Math.min.apply(null, z) >= 0){
         return table;
    }

    columnFocus = this.selectColumn(z);

    if(columnFocus >= 0){
        lineFocus = this.calcPP(columnFocus);
    }

    if(lineFocus === -1){
        alert("Ótimo não finíto");
        return table;
    }

    celFocus = table[lineFocus][columnFocus];

    //divide a linha para transformar o foco em 1
    table[lineFocus].forEach((x, i) => {
        table[lineFocus][i] = x/celFocus;
    });

    console.log(table);

    //Zerar a coluna
    table.forEach((x, i) => {
        if(i != lineFocus){
            x.forEach((y, j) => {
                table[i][j] = y - (y * table[lineFocus][j]);
            })
        }
    });

    console.log(table);

    return this.resolveSimplex(table);
  }


  twoSteps(numVariables, numFolgas, numArtificiais, restricoes, f_objetiva){
    
    let table = [];
    let countInFolgas = 0;
    let countInArt = 0;

    //insere as restrições na tabela
    restricoes.forEach((x,i) => {
        let temp = new Array(numVariables + numFolgas + numArtificiais + 1);
        
        temp.forEach((x, i) => {
            temp[i] = 0;
        });
        
        for(let j = 0; j < numVariables; j++ ){
            temp[j] = x[j]; 
        }

        switch(x[numVariables]){
            case "<=":
                temp[numVariables + countInFolgas] = 1;
                countInFolgas++;
                break;
        
            case ">=":
                temp[numVariables + numFolgas + countInArt] = 1;
                countInArt++;
                break;
            
            case "=":
                temp[numVariables + countInFolgas] = -1;
                temp[numVariables + numFolgas + countInArt] = 1;
                countInArt++;
                countInFolgas++;
                break;

            default:
                throw "restrição inválida!";
        }

        temp[temp.length - 1] = x[x.length -1];
      
        table.push(temp);
    });

    //insere a função objetiva (z) na tabela
    let z = new Array(numVariables + numFolgas + numArtificiais + 1);
    z.forEach((x, i) => {
        z[i] = 0;
    });

    f_objetiva.forEach((x, i) => {
        if(i < f_objetiva.length - 1)
            z[i] = x;

        else
            z[z.length - 1] = x;
    });

    table.push(z);


    //insere z' na tabela
    let zLinha = new Array(numVariables + numFolgas + numArtificiais + 1);
    
    zLinha.forEach((x, i) => {
        zLinha[i] = 0;
    });

    let linhasArtificiais = [];
    
    for(let i = 0; i < table.length - 1; i++){
        for(let j = 0; j < numArtificiais; j++){
            if(table[i][numVariables + numFolgas + j] === 1){
                linhasArtificiais.push(i);
            }
        }
    }

    for(let i = 0; i < numVariables + numFolgas; i++){
        let sumArt = 0;
        linhasArtificiais.forEach(x => {
            sumArt += table[x][i];
        })
        zLinha[i] = sumArt;
    }

    let sumArt = 0;
    linhasArtificiais.forEach(x => {
        sumArt += table[x][table[x].length-1];
    })
    zLinha[zLinha.length-1] = sumArt;

    table.push(zLinha);


    // Resolve primeira fase do metodo e retorna a tabela resolvida
    let firstStepTable = this.resolveSimplex(table);
    
    // Limpar tabela, retirando zLinha e artificiais 
    firstStepTable.pop();

    let a = firstStepTable.splice(0, numVariables + numFolgas - 1);
    let b = firstStepTable.splice(firstStepTable[0].length - 1);
    
    b.forEach((x, i) => {
        a[i].push(x[0]);
    });

    // Resolve simplex simples
    this.resolveSimplex(a);
  }

  isMultiplasSolucoes(restricoes, f_objetiva) {
    let coeficiente = restricoes[0][0]/f_objetiva[0];

    restricoes.forEach(x => {
        let count = 0;
        x.forEach((y, i) => {
            if(y/f_objetiva[i] === coeficiente){
                count++;
            }
        })
        if(count === x.length){
            return true;
        }
    })

    return false;
  }

  isDegenerescencia(table) {
      let z = table.splice[table.length -1];
      return z[0].includes(0);
  }
}
export default SimplexTable;