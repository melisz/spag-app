import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountsService} from '../../services/accounts.service';
import {Account} from '../../models/account';
import {NgForm} from '@angular/forms';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {
  accounts: Account[];
  newUser: Account;
  editAccount: Account;
  passwordCheck: string;
  resetAccount: boolean;
  newpassword: string;
  passMatch: boolean;
  constructor(private accountService: AccountsService, private titleService: Title) {
    this.titleService.setTitle(`Accounts`);
  }

  @ViewChild('aform', { static: false})
  private aform: NgForm;
  @ViewChild('uform', { static: false})
  private uform: NgForm;


  ngOnInit(): void {
    this.accounts = [];
    this.newUser = new Account(null, null, null, null, null);
    this.editAccount = new Account(null, null, null, null, null);
    this.editAccount.admin = null;
    this.resetAccount = false;
    this.passwordCheck = null;
    this.passMatch = true;
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }

  editUser(i): void  {
    const temp: string = this.accounts[i].username;
    this.accountService.findAccount(temp).subscribe((data) => {
      this.editAccount = data;

    });
  }

  setInactive(i): void  {
    this.editAccount = this.accounts[i];
    this.editAccount.active = !this.editAccount.active;
    this.accountService.updateAccount(this.editAccount).subscribe((data) => {
      this.editAccount = data;
    });
    if (this.editAccount.active){
      const modal2 = document.getElementById('modalPoll-2');
      modal2.style.display = 'block';
    }
  }

  update(): void {
    if (this.pCheck()){
      this.passMatch = true;
      this.editAccount.password = this.newpassword;
      this.accountService.updateAccount(this.editAccount).subscribe((data) =>
        this.accounts[this.accounts.indexOf(this.editAccount)] = data);
      this.aform.reset();
      this.onClose();
      this.refresh();
    }
    else {
      this.passMatch = false;
    }
  }

  addUser(): void {
    if (this.pCheck()) {
      this.passMatch = true;
      this.newUser.active = true;
      this.newUser.password = this.newpassword;
      this.accountService.createAccount(this.newUser).subscribe((data) =>
        this.accounts.push(data));
      this.clearFields();
      this.onClose();
      this.refresh();
      alert('Nieuwe accont toegevoegd');
    }
    else {
      this.passMatch = false;
    }
  }

  pCheck(): boolean {
    return this.newpassword === this.passwordCheck;
  }
  onClose(): void {
    const modal1 = document.getElementById('modalPoll-1');
    modal1.style.display = 'none';
    const modal2 = document.getElementById('modalPoll-2');
    modal2.style.display = 'none';
    const modal3 = document.getElementById('modalPoll-3');
    modal3.style.display = 'none';
  }

  clearFields(): void {
    this.uform.reset();
  }
  refresh(): void {
    window.location.reload();
  }
}
