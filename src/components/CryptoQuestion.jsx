// src/data/CryptoQuestions.js
const CryptoQuestions = [
  {
    keyword: "price",
    response: "I can check real-time crypto prices! Try asking:\n• 'What's the price of BTC?'\n• 'ETH price?'\n• 'How much is SOL?'",
    examples: ["price of BTC", "ETH value", "SOL cost"]
  },
  {
    keyword: "portfolio",
    response: "Your portfolio balance: 0.5 BTC ($31,425), 3.2 ETH ($11,040), 50 SOL ($7,500). Total: $49,965 📊\n\nWant to see more details? Go to Portfolio → Dashboard",
    examples: ["my balance", "portfolio value", "current holdings"]
  },
  {
    keyword: "buy",
    response: "To buy crypto:\n1. Go to Trade → Spot\n2. Select trading pair (ex: BTC/USDT)\n3. Enter amount\n4. Confirm trade\n\nNeed help with a specific coin?",
    examples: ["how to buy ETH", "purchase BTC", "get SOL"]
  },
  {
    keyword: "sell",
    response: "To sell crypto:\n1. Go to Trade → Spot\n2. Select trading pair (ex: BTC/USDT)\n3. Enter amount to sell\n4. Confirm trade\n\nPro tip: Set limit orders for better prices!",
    examples: ["sell my BTC", "how to sell ETH", "liquidate SOL"]
  },
  {
    keyword: "news",
    response: "Latest crypto news:\n1. Bitcoin ETF approval expected next month\n2. Ethereum completes major network upgrade\n3. Crypto market cap surpasses $2.5 trillion\n4. New regulation proposal for stablecoins\n\nSee more in News section",
    examples: ["crypto updates", "latest news", "market developments"]
  },
  {
    keyword: "wallet",
    response: "Wallet options:\n• Software wallet (mobile app)\n• Hardware wallet (Ledger/Trezor)\n• Exchange wallet\n\nFor best security, use hardware wallets for large holdings. Need setup help?",
    examples: ["crypto wallet", "store bitcoin", "secure storage"]
  },
  {
    keyword: "fees",
    response: "Current trading fees:\n• Maker: 0.1%\n• Taker: 0.2%\n\nVIP levels reduce fees:\n- VIP1 (30d vol > $10k): 0.09%/0.18%\n- VIP2 (30d vol > $50k): 0.08%/0.16%",
    examples: ["trading fees", "withdrawal costs", "transaction charges"]
  },
  {
    keyword: "withdraw",
    response: "To withdraw crypto:\n1. Go to Wallet → Withdraw\n2. Select currency\n3. Enter amount and address\n4. Confirm with 2FA\n\nNote: Minimum BTC withdrawal = 0.001 BTC",
    examples: ["withdraw BTC", "send crypto", "transfer out"]
  },
  {
    keyword: "deposit",
    response: "To deposit crypto:\n1. Go to Wallet → Deposit\n2. Select currency\n3. Copy deposit address\n4. Send from external wallet\n\nAlways send a test transaction first!",
    examples: ["add funds", "deposit ETH", "receive crypto"]
  },
  {
    keyword: "stake",
    response: "Current staking options:\n• ETH: 4.2% APY\n• SOL: 6.8% APY\n• ADA: 3.5% APY\n\nMinimum staking amounts:\n- ETH: 0.1\n- SOL: 1\n- ADA: 100",
    examples: ["staking rewards", "earn interest", "passive income"]
  },
  {
    keyword: "security",
    response: "Security recommendations:\n1. Enable 2FA\n2. Use unique password\n3. Whitelist withdrawal addresses\n4. Beware phishing emails\n5. Never share API keys\n\nCheck Security Center for more tips",
    examples: ["account safety", "protect assets", "hack prevention"]
  },
  {
    keyword: "help",
    response: "How can I assist? I can help with:\n• Crypto prices\n• Portfolio balance\n• Trading guidance\n• Account security\n• Market news\n\nTry: 'How to buy BTC?' or 'Show my portfolio'",
    examples: ["support", "assistance", "help me"]
  },
  {
    keyword: "tax",
    response: "Crypto tax considerations:\n1. Trading profits are taxable\n2. Staking rewards count as income\n3. Report all transactions\n\nWe provide tax reports: Reports → Tax Documents",
    examples: ["crypto taxes", "tax reporting", "IRS requirements"]
  },
  {
    keyword: "trend",
    response: "Current market trends:\n• BTC dominance: 42.3%\n• Top gainers: SOL (+8.2%), DOT (+5.4%)\n• Trending coins: RNDR, INJ, SEI\n\nSee charts in Markets section",
    examples: ["market trends", "top performers", "trending coins"]
  },
  {
    keyword: "alert",
    response: "To set price alerts:\n1. Go to Alerts → Create\n2. Select coin (ex: BTC)\n3. Set target price\n4. Choose notification method\n\nPro tip: Set alerts for key support/resistance levels!",
    examples: ["price notification", "set alert", "watch price"]
  },
  {
    keyword: "exchange",
    response: "We support 200+ trading pairs including:\n• BTC/USDT, ETH/USDT\n• SOL/BTC, DOT/ETH\n• Major fiat pairs\n\nFull list: Trade → Markets",
    examples: ["trading pairs", "available coins", "supported currencies"]
  }
];

export default CryptoQuestions;