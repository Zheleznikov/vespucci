export default class EventGenerate {
   noAuthEventGenerate() {
    const authGen = new CustomEvent("is-auth", {
      detail: "no-auth",
    });
    document.dispatchEvent(authGen);
  }

   authEventGenerate() {
    const authGen = new CustomEvent("is-auth", {
      detail: "auth-was-made",
    });
    document.dispatchEvent(authGen);
  }

}


