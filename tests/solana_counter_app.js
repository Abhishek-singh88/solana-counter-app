const anchor = require("@coral-xyz/anchor");
const { SystemProgram } = anchor.web3;

describe("solana_counter_app", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SolanaCounterApp;

  it("Initializes counter", async () => {
    const counterKeypair = anchor.web3.Keypair.generate();

    await program.methods
      .initialize()
      .accounts({
        counter: counterKeypair.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([counterKeypair])
      .rpc();

    const account = await program.account.counter.fetch(counterKeypair.publicKey);
    console.log("Counter:", account.count.toString());
  });

  it("Increments counter", async () => {
    const counterKeypair = anchor.web3.Keypair.generate();

   
    await program.methods
      .initialize()
      .accounts({
        counter: counterKeypair.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([counterKeypair])
      .rpc();

    await program.methods
      .increment()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc();

    const account = await program.account.counter.fetch(counterKeypair.publicKey);
    console.log("Counter after increment:", account.count.toString());
  });
});
