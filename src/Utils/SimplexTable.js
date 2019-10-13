class SimplexTable{


  calcPP(column, tableSimplex){
    let pp = [];
    tableSimplex.forEach(x => {
      let temp = x[x.length-1]/x[column];
      if (temp >= 0)
        pp.push(temp); 
    });

    return Math.min.apply(null, pp);
  }

  selectColumn(f_objetiva){
    let min = Math.min.apply(null, f_objetiva);
    if(min < 0){
        f_objetiva.forEach((x, i) => {
            if(min == x){
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


  TwoSteps(variables, numFolgas, numAritificiais, restricoes, f_objetiva){
    
    let table = [];
    
    let countInFolgas = 0;
    let countInArt = 0;

    //insere as restrições na tabela
    restricoes.forEach((x,i) => {
        let temp = new Array(variables.length + numFolgas + numAritificiais + 1);
        
        temp.forEach((x, i) => {
            temp[i] = 0;
        });
        
        for(let j = 0; j < variables.length; j++ ){
            temp[j] = x[j]; 
        }

        switch(x[variables.length]){
            case "<=":
                temp[variables.length + countInFolgas] = 1;
                countInFolgas++;
                break;
        
            case ">=":
                temp[variables.length + numFolgas + countInArt] = 1;
                countInArt++;
                break;
            
            case "=":
                temp[variables.length + countInFolgas] = -1;
                temp[variables.length + numFolgas + countInArt] = 1;
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
    let z = new Array(variables.length + numFolgas + numAritificiais + 1);
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

    let zLinha = new Array(variables.length + numFolgas + numAritificiais + 1);
    zLinha.forEach((x, i) => {
        zLinha[i] = 0;
    });

    let linhasArtificiais = [];
    
    for(let i = 0; i < table.length - 1; i++){
        for(let j = 0; j < numAritificiais; j++){
            if(table[i][variables.length + numFolgas + j] == 1){
                linhasArtificiais.push(i);
            }
        }
    }

    for(let i = 0; i < variables.length + numFolgas; i++){
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
  }


}
export default SimplexTable;