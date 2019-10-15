class Simplex {
  calcPP(column, tableSimplex, step) {
    let pp = [];
    let tableTemp = [...tableSimplex];
    tableTemp.pop();
    if (step === 1) {
      tableTemp.pop();
    }
    tableTemp.forEach(x => {
      if (x[column] !== 0) {
        let temp = x[x.length - 1] / x[column];
        if (temp >= 0) pp.push(temp);
        else pp.push(9999);
      } else {
        pp.push(9999);
      }
    });

    let min = Math.min.apply(null, pp);

    if (min === 9999) {
      return -1;
    }

    for (let i = 0; i < pp.length; i++) {
      if (min === pp[i]) {
        return i;
      }
    }
  }

  selectColumn(f_objetiva) {
    let z = [...f_objetiva];
    z.pop();
    let min = Math.min.apply(null, z);

    if (min < 0) {
      for (let i = 0; i < z.length; i++) {
        if (min === z[i]) {
          return i;
        }
      }
    }
  }

  solveSimplex(table, tam, step, iterations) {
    let columnFocus;
    let lineFocus = 0;
    let z = [...table[table.length - 1]];
    if (tam === 0) z.pop();

    if (Math.min.apply(null, z) >= 0) {
      if (iterations.length === 0) {
        return table;
      }
      return iterations;
    }

    columnFocus = this.selectColumn(z);

    if (columnFocus >= 0) {
      lineFocus = this.calcPP(columnFocus, table, step);
    }

    if (lineFocus === -1) {
      alert("Ótimo não finíto");
      return iterations;
    }

    let celFocus = table[lineFocus][columnFocus];

    //divide a linha para transformar o foco em 1

    for (let i = 0; i < table[lineFocus].length; i++) {
      if (celFocus !== 0) {
        table[lineFocus][i] =
          Math.round((table[lineFocus][i] / celFocus) * 100) / 100;
      }
    }
    iterations.push(table.map(x => x.map(x => x)));
    console.log(table);

    //Zerar a coluna
    for (let i = 0; i < table.length; i++) {
      if (i !== lineFocus) {
        let valueFocus = table[i][columnFocus];
        for (let j = 0; j < table[i].length; j++) {
          table[i][j] = table[i][j] - valueFocus * table[lineFocus][j];
        }
      }
    }

    console.log(table);
    iterations.push(table.map(x => x.map(x => x)));
    tam++;
    return this.solveSimplex(table, tam, step, iterations);
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
      switch (x[numVariables]) {
        case "<=":
          numFolgas++;
          break;

        case "=":
          numArtificiais++;
          break;

        case ">=":
          numFolgas++;
          numArtificiais++;
          break;

        default:
          alert("restrição inválida!");
      }
    });

    //insere as restrições na tabela
    restricoes.forEach(x => {
      let temp = new Array(numVariables + numFolgas + numArtificiais + 1);

      for (let i = 0; i < temp.length; i++) {
        temp[i] = 0;
      }

      for (let j = 0; j < numVariables; j++) {
        temp[j] = parseInt(x[j]);
      }

      switch (x[numVariables]) {
        case "<=":
          temp[numVariables + countInFolgas] = 1;
          countInFolgas++;
          break;

        case "=":
          temp[numVariables + numFolgas + countInArt] = 1;
          countInArt++;
          break;

        case ">=":
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

    for (let i = 0; i < z.length; i++) {
      z[i] = 0;
    }

    for (let i = 0; i < f_objetiva.length; i++) {
      if (i < f_objetiva.length - 1) z[i] = parseInt(f_objetiva[i]);
      else z[z.length - 1] = parseInt(f_objetiva[i]);
    }

    table.push(z);

    //insere z' na tabela
    let zLinha = new Array(numVariables + numFolgas + numArtificiais + 1);

    for (let i = 0; i < zLinha.length; i++) {
      zLinha[i] = 0;
    }

    let linhasArtificiais = [];

    for (let i = 0; i < table.length - 1; i++) {
      for (let j = 0; j < numArtificiais; j++) {
        if (table[i][numVariables + numFolgas + j] === 1) {
          linhasArtificiais.push(i);
        }
      }
    }

    for (let i = 0; i < numVariables + numFolgas; i++) {
      let sumArt = 0;
      linhasArtificiais.forEach(x => {
        sumArt += table[x][i];
      });
      if (sumArt !== 0) zLinha[i] = sumArt * -1;
    }

    let sumArt = 0;
    linhasArtificiais.forEach(x => {
      sumArt += table[x][table[x].length - 1];
    });
    zLinha[zLinha.length - 1] = sumArt * -1;

    table.push(zLinha);

    let iterations = [];
    // Resolve primeira fase do metodo e retorna a tabela resolvida
    let output = this.solveSimplex(table, 0, 1, iterations);
    let firstStepTable = output[output.length - 1];
    // Limpar tabela, retirando zLinha e artificiais
    firstStepTable.pop();

    let finalTable = [];
    for (let i = 0; i < restricoes.length + 1; i++) {
      let a = firstStepTable[i].slice(0, numVariables + numFolgas);
      let b = firstStepTable[i].slice(firstStepTable[i].length - 1);
      finalTable[i] = [];
      finalTable[i].push(...a);
      finalTable[i].push(...b);
    }

    iterations = [];
    // Resolve simplex simples
    let output2 = this.solveSimplex(finalTable, 0, 2, iterations);
    let result = output2[output2.length - 1];

    if (this.isMultiplasSolucoes(restricoes, f_objetiva)) {
      alert("Multiplas Soluções Ótimas!");
    }

    if (this.isDegenerescencia(result)) {
      alert("Degenerescência!");
    }
    output.push(output2);
    return output;
  }

  isMultiplasSolucoes(restricoes, f_objetiva) {
    let coeficiente = restricoes[0][0] / f_objetiva[0];

    for (let i = 0; i < restricoes.length; i++) {
      let count = 0;
      for (let j = 0; j < restricoes[i].length - 2; j++) {
        if (restricoes[i][j] / f_objetiva[j] === coeficiente) {
          count++;
        }
      }

      if (count === restricoes[i].length - 2) {
        return true;
      }
    }

    return false;
  }

  isDegenerescencia(table) {
    let b = table.map(x => x[x.length - 1]);
    b.pop();
    return b.includes(0);
  }
}

export default Simplex;
