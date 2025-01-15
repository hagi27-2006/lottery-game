const prizes = {
    "1等": {組: "11", 番号: "106348", 賞金: 7000000000},
    "1等前後賞": {番号: ["106347", "106349"], 賞金: 1500000000},
    "2等": {
      組番号: [
        ["52", "151307"], ["49", "135439"], ["39", "167124"],
        ["65", "138164"], ["60", "122015"], ["46", "116185"], ["84", "120749"],
      ],
      賞金: 10000000
    },
    "3等": {番号: "103265", 賞金: 1000000},
    "4等": {番号末尾: "6135", 賞金: 50000},
    "5等": {番号末尾: "896", 賞金: 10000},
    "6等": {番号末尾: "64", 賞金: 3000},
    "7等": {番号末尾: "6", 賞金: 300},
  };
  
  const ticketPrice = 300;
  
  function playLottery(numTickets) {
    let totalCost = numTickets * ticketPrice;
    let totalPrize = 0;
    const results = {
      "1等": 0, "1等前後賞": 0, "2等": 0,
      "3等": 0, "4等": 0, "5等": 0,
      "6等": 0, "7等": 0,
    };
  
    for (let i = 0; i < numTickets; i++) {
      const group = `${Math.floor(Math.random() * 100).toString().padStart(2, "0")}`;
      const number = `${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`;
  
      // Check 1等
      if (group === prizes["1等"].組 && number === prizes["1等"].番号) {
        results["1等"]++;
        totalPrize += prizes["1等"].賞金;
        continue;
      }
  
      // Check 1等前後賞
      if (group === prizes["1等"].組 && prizes["1等前後賞"].番号.includes(number)) {
        results["1等前後賞"]++;
        totalPrize += prizes["1等前後賞"].賞金;
        continue;
      }
  
      // Check 2等
      for (const [grp, num] of prizes["2等"].組番号) {
        if (group === grp && number === num) {
          results["2等"]++;
          totalPrize += prizes["2等"].賞金;
          break;
        }
      }
  
      // Check 3等
      if (number === prizes["3等"].番号) {
        results["3等"]++;
        totalPrize += prizes["3等"].賞金;
      }
  
      // Check 4-7等
      for (const rank of ["4等", "5等", "6等", "7等"]) {
        if (number.endsWith(prizes[rank].番号末尾)) {
          results[rank]++;
          totalPrize += prizes[rank].賞金;
        }
      }
    }
  
    return { results, totalCost, totalPrize };
  }
  
  document.getElementById("playButton").addEventListener("click", () => {
    const ticketCount = parseInt(document.getElementById("ticketCount").value);
    if (isNaN(ticketCount) || ticketCount <= 0) {
      alert("Please enter a valid number of tickets.");
      return;
    }
  
    const { results, totalCost, totalPrize } = playLottery(ticketCount);
  
    let resultHTML = `<h2>Results</h2>`;
    resultHTML += `<p>Total Cost: ${totalCost.toLocaleString()}円</p>`;
    resultHTML += `<p>Total Prize: ${totalPrize.toLocaleString()}円</p>`;
    resultHTML += `<ul>`;
    for (const [rank, count] of Object.entries(results)) {
      if (count > 0) {
        resultHTML += `<li>${rank}: ${count} tickets</li>`;
      }
    }
    resultHTML += `</ul>`;
  
    document.getElementById("results").innerHTML = resultHTML;
  });
  
  document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("ticketCount").value = "1";
    document.getElementById("results").innerHTML = "";
  });
  