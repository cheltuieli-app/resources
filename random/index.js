// Copyright (c) 2023 Alexandru Catrina <alex@codeissues.net>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const ro_RO = [
  "numele tău",
  "RON",
  ["Salariu", "Depozit și economii"],
  {
    "Aeroport": [
      "Bilet"
    ],
    "Catering": [
      "Mâncare"
    ],
    "Florărie": [
      "Cadou"
    ],
    "Frizerie": [
      "Servicii"
    ],
    "Hypermarket": [
      "Cumpărături",
      "Alimente",
      "Răcoritoare"
    ],
    "Librărie": [
      "Cărți"
    ],
    "Magazin": [
      "Cumpărături",
      "Alimente",
      "Răcoritoare",
      "Cărți",
      "Mâncare",
      "Cadou"
    ],
    "Parcare": [
      "Bilet"
    ],
    "Piață": [
      "Legume",
      "Fructe",
      "Alimente"
    ],
    "Restaurant": [
      "Mâncare",
      "Răcoritoare"
    ],
    "Stație de alimentare": [
      "Carburanți"
    ],
    "Transport": [
      "Bilet"
    ],
    "Utilități": [
      "Utilități"
    ]
  }
];

/**************************** close locale support ****************************/

const support = { ro_RO };

function bc(payments) {
  const keys = Object.keys(payments);
  const actor = keys[Math.floor(Math.random() * keys.length)];
  const category = payments[actor][Math.floor(Math.random() * payments[actor].length)];

  return [actor, category];
}

function d(today = new Date()) {
  const twelveMonthsAgo = new Date(today.getFullYear() - 1, today.getMonth(), 1); // 1st of the month
  const dt = new Date(today.getTime() + Math.random() * (twelveMonthsAgo.getTime() - today.getTime()));

  return [
    `${dt.getFullYear()}`,
    `${dt.getMonth() + 1}`.padStart(2, '0'),
    `${dt.getDate()}`.padStart(2, '0')
  ].join('-');
}

function s(digits = 5) {
  const value = Math.random() * (Math.random() * Math.pow(10, digits));

  return value.toFixed(0);
}

process.argv.slice(2).forEach(a => {
  const [yourself, currency, [income, savings], expenses] = support[a];

  const lines = new Array(15).fill(null).reduce(acc => {
    const p0 = ['cheltuieli.app', yourself, income, d(), s(6), currency];
    const pn = new Array(Math.random().toFixed(1) * 10 + 1).fill(null).map(() => {
      return [yourself, ...bc(expenses), d(), s(), currency];
    });

    return [p0.join(','), ...pn.map(a => a.join(',')), ...acc];
  }, []);

  const luckyIndex = Math.floor(Math.random() * lines.length);
  const randomData = [
    ...lines.slice(0, luckyIndex),
    [yourself, yourself, savings, d(), s(6), currency].join(','),
    ...lines.slice(luckyIndex),
  ].join("\n");

  console.log(randomData);
});
