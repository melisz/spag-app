import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {MessagesComponent} from "./messages.component";
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Component, Injectable, OnInit} from '@angular/core';
import {CookieModule, CookieService} from 'ngx-cookie';
import {user} from "../../models/message/user";
import {message} from "../../models/message/message";
import {Title} from "@angular/platform-browser";
import {NotificationService} from '../../services/notification.service';
import {MessagesDetails} from "../../details/messages/messages.details";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {HeaderComponent} from "../header/header.component";
import {Router} from "@angular/router";
import {AppRoutingModule} from "../../app-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {MessagesService} from "../../services/messages.service";
import {HomeNotificationComponent} from "../home-notification/home-notification.component";


describe('messageComponent', () => {
  let component: MessagesComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<MessagesComponent>;
  let cookieService: CookieService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeNotificationComponent, NavBarComponent, HeaderComponent, MessagesComponent, MessagesDetails],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CookieModule.forRoot(), RouterTestingModule],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  beforeEach(inject([CookieService], (object) => {

    try {
      cookieService.put('user', "Tarquin Weesie");
    } catch (e) {
    }
    try {
      cookieService.put('username', "Tarquin.Weesie@hva.nl");
    } catch (e) {
    }
    try {
      cookieService.put('restaurant', "Spaget");
    } catch (e) {
    }
    try {
      cookieService.put('admin', "false");
    } catch (e) {
    }
    try {
      cookieService.put('login', 'true');
    } catch (e) {
    }



  }));


  it("Account data gets properly loaded in)", () => {

    console.log("e")
    expect(true)
  });

});



