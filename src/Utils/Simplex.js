class Simplex {


  calcPP(column, tableSimplex){
    let pp = [];
    tableSimplex.forEach(x => {
        if(x[column] !== 0){
            let temp = x[x.length-1]/x[column];
            if (temp >= 0)
                pp.push(temp);
            else
                pp.push(9999);
        }
        else{
            pp.push(9999);
        }

    });

    let min = Math.min.apply(null, pp);

    if(min === 9999) {
        return -1;
    }

    for(let i = 0; i < pp.length; i++){
        if(min === pp[i]){
            return i;
        }
    }
  }

  selectColumn(f_objetiva){
    let min = Math.min.apply(null, f_objetiva);


    if(min < 0){
        for(let i = 0; i < f_objetiva.length; i++){
            if(min === f_objetiva[i]){
                return i;
            }
        }
    }
  }

  solveSimplex(table){
    let columnFocus;
    let lineFocus = 0;
    let z = table[table.length - 1];
    z.pop();

    if(Math.min.apply(null, z) >= 0){
         return table;
    }

    columnFocus = this.selectColumn(z);

    if(columnFocus >= 0){
        lineFocus = this.calcPP(columnFocus, table);
    }

    if(lineFocus === -1){
        alert("Ótimo não finíto");
        return table;
    }

    let celFocus = table[lineFocus][columnFocus];

    //divide a linha para transformar o foco em 1
    table[lineFocus].forEach((x, i) => {
        table[lineFocus][i] = x/celFocus;
    });

    console.log(table);

    //Zerar a coluna
    table.forEach((x, i) => {
        if(i !== lineFocus){
            x.forEach((y, j) => {
                table[i][j] = y - (y * table[lineFocus][j]);
            })
        }
    });

    console.log(table);

    return this.solveSimplex(table);
  }


  twoSteps(numVariables, restricoes, f_objetiva) {

    let numFolgas = 0;
    let numArtificiais = 0;

    numVariables = parseInt(numVariables);

    let table = [];
    let countInFolgas = 0;
    let countInArt = 0;

    console.log("restricoes: " + restricoes);
    restricoes.forEach(x => {

        switch(x[numVariables]){
            case "<=":
                numFolgas++;
                break;

            case ">=":
                numArtificiais++;
                break;

            case "=":
                numFolgas++
                numArtificiais++;
                break;

            default:
                alert("restrição inválida!");
        }

    });


    //insere as restrições na tabela
    restricoes.forEach(x => {
        let temp = new Array(numVariables + numFolgas + numArtificiais + 1);

        for(let i = 0; i < temp.length; i++){
            temp[i] = 0;
        }

        for(let j = 0; j < numVariables; j++ ){
            temp[j] = parseInt(x[j]);
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
                alert("restrição inválida!");
        }

        temp[temp.length - 1] = parseInt(x[x.length - 1]);

        table.push(temp);
    });

    console.log(table);

    //insere a função objetiva (z) na tabela
    let z = new Array(numVariables + numFolgas + numArtificiais + 1);

    for(let i = 0; i < z.length; i++){
        z[i] = 0;
    }

    for(let i = 0; i < f_objetiva.length; i++) {
        if(i < f_objetiva.length - 1)
            z[i] = parseInt(f_objetiva[i]);

        else
            z[z.length - 1] = parseInt(f_objetiva[i]);
    }

    table.push(z);


    //insere z' na tabela
    let zLinha = new Array(numVariables + numFolgas + numArtificiais + 1);

    for(let i = 0; i < zLinha.length; i++){
        zLinha[i] = 0;
    }

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
        zLinha[i] = sumArt * (-1);
    }

    let sumArt = 0;
    linhasArtificiais.forEach(x => {
        sumArt += table[x][table[x].length-1];
    })
    zLinha[zLinha.length-1] = sumArt * (-1);

    table.push(zLinha);


    // Resolve primeira fase do metodo e retorna a tabela resolvida
    let firstStepTable = this.solveSimplex(table);

    // Limpar tabela, retirando zLinha e artificiais
    firstStepTable.pop();

    let a = firstStepTable.splice(0, numVariables + numFolgas - 1);
    let b = firstStepTable.splice(firstStepTable.length - 1);

    
    for(let i = 0; i < b[0].length; i++){
        a[i].push(b[i][0]);
    }

    // Resolve simplex simples
    return this.solveSimplex(a);
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

export default Simplex;