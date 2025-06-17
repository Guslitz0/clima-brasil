const cidadesPorRegiao = {
  'norte': [
    'Manaus', 'Belém', 'Porto Velho', 'Rio Branco', 'Macapá',
    'Palmas', 'Boa Vista', 'Marabá', 'Santarém', 'Ji-Paraná'
  ],
  'nordeste': [
    'Salvador', 'Fortaleza', 'Recife', 'Natal', 'São Luís',
    'Teresina', 'João Pessoa', 'Maceió', 'Aracaju', 'Juazeiro do Norte'
  ],
  'centro-oeste': [
    'Brasilia', 'Goiânia', 'Cuiabá', 'Campo Grande',
    'Anápolis', 'Sinop', 'Rondonópolis', 'Dourados'
  ],
  'sudeste': [
    'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Vitória',
    'Campinas', 'Uberlândia', 'Juiz de Fora', 'São José dos Campos'
  ],
  'sul': [
    'Curitiba', 'Florianópolis', 'Porto Alegre',
    'Londrina', 'Joinville', 'Caxias do Sul', 'Pelotas', 'Chapecó'
  ]
};

function atualizarCidades() {
  const regiao = document.getElementById('regiao').value;
  const cidadeSelect = document.getElementById('cidade');
  cidadeSelect.innerHTML = '<option value="">-- Escolha uma Cidade --</option>';

  if (cidadesPorRegiao[regiao]) {
    cidadesPorRegiao[regiao].forEach(cidade => {
      const option = document.createElement('option');
      option.value = cidade;
      option.textContent = cidade;
      cidadeSelect.appendChild(option);
    });
  }
}

async function consultarClima() {
  const cidade = document.getElementById('cidade').value;
  const apiKey = '8d67cc20da9beca51832f22756f03d39';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error("Cidade não encontrada.");

    const dados = await resposta.json();

    document.getElementById('resultado').innerHTML = `
      <h2>${dados.name} - ${dados.sys.country}</h2>
      <p><strong>🌡️ Temperatura:</strong> ${dados.main.temp} °C</p>
      <p><strong>☁️ Condição:</strong> ${dados.weather[0].description}</p>
      <p><strong>💧 Umidade:</strong> ${dados.main.humidity}%</p>
      <p><strong>💨 Vento:</strong> ${dados.wind.speed} m/s</p>
      <img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png" alt="Condição do tempo">
    `;
  } catch (erro) {
    document.getElementById('resultado').innerHTML = `<p style="color:red;">${erro.message}</p>`;
  }
}
