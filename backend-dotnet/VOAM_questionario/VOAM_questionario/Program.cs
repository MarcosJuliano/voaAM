using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

//ORDEM DAS MATERIAS E DOS JSONS

List<string> materias = new List<string>
{
    "biologia.json",
    "historia.json",
    "matematica.json",
    "portugues.json"
};

//configuração do simulado. quantidade de questões e pontuação

int qtpmateira = 1;

int acerto = 0;
int qttotal = 0;

Random random = new Random();

Console.Clear();
Console.WriteLine("              SIMULADO ENEM                  ");
Console.WriteLine("responda degitando a letra correspondente, A, B ,C, D ou E");
Console.WriteLine("aperte qualquer tecla para iniciar o exame");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ALTERAÇÃO PARA TESTE
// Console.ReadKey(); codigo antigo
Console.ReadLine();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~

Console.Clear();

//loop para as materias

foreach (string arquivomaterias in materias)
{
    string caminhoarquivo = Path.Combine("questoes_materias", arquivomaterias);

    if (!File.Exists(caminhoarquivo))
    {
        Console.WriteLine($"Aviso: O arquivo '{caminhoarquivo}' nao foi encontrado. Pulando materia...");
        continue;
    }


    //carregando o json

    string jsonstring = File.ReadAllText(caminhoarquivo);
    List<questao> todasQuestoesDaMateria = JsonSerializer.Deserialize<List<questao>>(jsonstring);

    if (todasQuestoesDaMateria == null || todasQuestoesDaMateria.Count == 0) continue;

    //tornando as questões aleatorias

    int totalDisponivel = todasQuestoesDaMateria.Count;
    while (totalDisponivel > 1)
    {
        totalDisponivel--;
        int i = random.Next(totalDisponivel + 1);
        questao valor = todasQuestoesDaMateria[i];
        todasQuestoesDaMateria[totalDisponivel] = valor;
    }

    /*quantidade de questoes que sera exibido controlado por qtpmateria
     * QUANDO FOR AUMENTAR O NUMERO DE QUESTOES, ALTERAR O VALOR DA VARIAVEL qtpmateria(linha 18) */

    int exibirquestoes = Math.Min(qtpmateira, todasQuestoesDaMateria.Count);
    string exibirnome = arquivomaterias.Replace(".json", "").ToUpper();

    Console.WriteLine($"             INICIANDO BLOCO DE: {exibirnome}      ");

    for (int k = 0; k < exibirquestoes; k++)
    {
        questao questao = todasQuestoesDaMateria[(int)k];
        qttotal++;

        Console.Write($"\nQuestao {qttotal} [{exibirnome}]: ");

        //formatação de texto automatica
        EscreverTextoComQuebra(questao.enunciado, 80);
        Console.WriteLine();

        //aleatorizando as auternativas

        List<string> alternativasEmbaralhadas = new List<string>(questao.Alternativas);
        int n = alternativasEmbaralhadas.Count;
        while (n > 1)
        {
            n--;
            int j = random.Next(n + 1);
            string valor = alternativasEmbaralhadas[j];
            alternativasEmbaralhadas[j] = alternativasEmbaralhadas[n];
            alternativasEmbaralhadas[n] = valor;
        }

        //exibição das questões

        char opcao = 'A';
        Dictionary<char, string> mapaRespostas = new Dictionary<char, string>();

        foreach (var alt in alternativasEmbaralhadas)
        {
            Console.Write($"{opcao}) ");
            EscreverTextoComQuebra(alt, 80);
            mapaRespostas.Add(opcao, alt);
            opcao++;
        }

        //validação
        Console.Write("\n Sua resposta");
        char respostaUsuario = char.ToUpper(Console.ReadKey().KeyChar);
        Console.WriteLine("\n");

        if (mapaRespostas.ContainsKey(respostaUsuario))
        {
            string textoEscolhido = mapaRespostas[respostaUsuario];

            if (textoEscolhido == questao.Alternativacorreta)
            {
                Console.WriteLine("Correto!");
                acerto++;
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"Incorreto. A resposta certa era: {questao.Alternativacorreta}");
                Console.ResetColor();
            }
        }
        else
        {
            Console.WriteLine("Opcao invalida! questão perdida.");
        }

        Console.WriteLine(new string('-', 60));
    }
    Console.WriteLine($"\n--- FIM DO BLOCO DE {exibirnome} ---\n\n");

}

Console.WriteLine("                     SIMULADO CONCLUIDO!                    ");

//resulados
Console.WriteLine($"Resultado Final: Voce acertou {acerto} de um total de {qttotal} questoes.");
Console.WriteLine("Aperte qualquer tecla para fechar o programa...");
Console.ReadKey();

//funcao para a formatacao do texto

void EscreverTextoComQuebra(string texto, int limiteCaracteres)
{
    string[] palavras = texto.Split(' ');
    string linhaAtual = "";
    foreach (string palavra in palavras)
    {
        if ((linhaAtual + palavra).Length > limiteCaracteres)
        {
            Console.WriteLine(linhaAtual.TrimEnd());
            linhaAtual = "";
        }
        linhaAtual += palavra + " ";
    }

    if (linhaAtual.Length > 0)
    {
        Console.WriteLine(linhaAtual.TrimEnd());
    }
}

public class questao
{
    public string enunciado { get; set; }
    public List <string> Alternativas { get; set; }
    public string Alternativacorreta { get; set; }
}
