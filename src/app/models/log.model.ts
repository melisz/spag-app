
export class Log {

  id: number;
  private static latestId: number;
  date: string;
  name: string;
  new_order: string; // Wat er moet besteld worden
  defects: string; // defecte spullen
  losts: string;

  pasta_order_res: number; // aantal pasta's verkocht in het restaurant
  pasta_order_del: number; // aantal pasta's verkocht door bezorging
  revenue_res: string; // omzet voor in het restaurant
  revenue_del: string; // omzet door bestellingen
  revenue_tot: string; // totale omzet

  expendpp: string; // Besteed per persoon, exclusief bezorgkosten
  houres_worked: string; // number of houres worked on a day
  return_incl_del: string; // rendement inclusief bezorging
  on_house: string; // amount of from the house
  discount: string; // amount of discount
  broken: string; // amount of broken things
  correction: string;
  cash_difference: string;

  general_details: string;

  checked: boolean;
  username: string;

  restaurant: string;

  constructor()
  constructor(id: number, date: string, name: string, new_order: string, defects: string, losts: string, pasta_order_res: number,
              pasta_order_del: number, revenue_res: string, revenue_del: string, revenue_tot: string, expendpp: string,
              houres_worked: string, return_incl_del: string, on_house: string, discount: string, broken: string,
              correctie: string, cash_difference: string, general_details: string, checked: boolean, username)
  constructor(id?: number, date?: string, name?: string, new_order?: string, defects?: string, losts?: string,
              pasta_order_res?: number,
              pasta_order_del?: number, revenue_res?: string, revenue_del?: string, revenue_tot?: string, expendpp?: string,
              houres_worked?: string, return_incl_del?: string, on_house?: string, discount?: string, broken?: string,
              correction?: string, cash_difference?: string, general_details?: string, checked?: boolean, username?: string) {
    this.id = id;
    this.date = date;
    this.name = name;
    this.new_order = new_order;
    this.defects = defects;
    this.losts = losts;

    this.pasta_order_res = pasta_order_res;
    this.pasta_order_del = pasta_order_del;
    this.revenue_res = revenue_res;
    this.revenue_del = revenue_del;
    this.revenue_tot = revenue_tot;
    this.expendpp = expendpp;
    this.houres_worked = houres_worked;
    this.return_incl_del = return_incl_del;
    this.on_house = on_house;
    this.discount = discount;
    this.broken = broken;
    this.correction = correction;
    this.cash_difference = cash_difference;
    this.general_details = general_details;
    this.checked = checked;
    this.username = username;
  }

  public static trueCopy(log: Log): Log {
    return log == null ? null : Object.assign(new Log(), log);
  }

  static randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static datePicker() {
    let dt = new Date(2020, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30),
      Math.floor(Math.random() * 60), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
    return dt.toLocaleDateString();
  }

  static incrementId() {
    if (!this.latestId) {
      this.latestId = 1;
    } else {
      this.latestId++;
    }
    return this.latestId;
  }

  static randomLog() {

    const date = Log.datePicker();
    const name = 'John Doe';
    const newOrder = 'borden';
    const defects = 'vriezer';
    const losts = 'mobiele telefoon, jas, tas, sleutels, portomonee, pinpas';

    const pastaOrderRes = Log.randomNumber(300, 1200);
    const pastaOrderDel = Log.randomNumber(100, 300);

    const rrNum = (Log.randomNumber(9000, 12000));
    const revenueRes = rrNum.toFixed(2);

    const rdNum = (Log.randomNumber(3000, 4000));
    const revenueDel = rdNum.toFixed(2);

    const rtNum = (rrNum + rdNum);
    const revenueTot = rtNum.toFixed(2);

    const expendPP = (rrNum / pastaOrderRes).toFixed(2);

    const hwNum = Log.randomNumber(4, 12);
    const houresWorked = hwNum.toFixed(2);

    const ridNum = (rrNum * 0.20);

    const returnInclDel = ridNum.toFixed(2);


    const fromHouse = (rtNum * 0.002).toFixed(2);

    const discount = (rtNum * 0.008).toFixed(2);

    const brkNum = Log.randomNumber(0, (rtNum * 0.005));
    const broken = brkNum.toFixed(2);

    const corNum = Log.randomNumber(50, 200);
    const correctie = corNum.toFixed(2);

    const csNum = Log.randomNumber(50, 200);
    const cashDifference = csNum.toFixed(2);

    const generalDetails = 'Algemene details worden hier beschreven.';

    return new Log(this.incrementId(), date, name, newOrder, defects, losts, pastaOrderRes, pastaOrderDel, revenueRes, revenueDel, revenueTot,
      expendPP, houresWorked, returnInclDel, fromHouse, discount, broken, correctie, cashDifference,
      generalDetails, false, "");

  }
}
