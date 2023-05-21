//modulos externos
import inquerer from "inquirer";
import chalk from "chalk";

//modulos internos
import fs from "fs";

operation();

function operation() {
  inquerer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action === "Criar Conta") {
        createAccount();
      }
    })
    .catch((err) => console.log(err));
}

// create an account
function createAccount() {
  console.log(chalk.bgGreen.black("Obrigado por escolher nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));

  buildAccount();
}

function buildAccount() {
  inquerer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta: ",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black(
            "Esta conta já existe, escolha outro nome!"
          )
        );
        buildAccount();
        return
      }
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err);
        }
      );
      console.log(chalk.green('Parabéns, sua conta foi criada!'))
      operation()
    })
    .catch((err) => console.log(err));
}
