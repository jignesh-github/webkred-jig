<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true"
    CodeFile="PlansAndPricing.aspx.cs" Inherits="WebKred.PlansAndPricing" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <style>
        .main-div
        {
            border: solid 1px black;
            margin: 20px 70px 0px 70px;
            height: 400px;
            background-color: Gray;
        }
        .left-div
        {
            border: 2px solid purple;
            height: 300px;
            margin: 50px 0 0 75px;
            position: absolute;
            width: 275px;
            background-color: White;
        }
        .middle-div
        {
            border: 3px solid green;
            height: 350px;
            margin: 25px 0 0 312px;
            position: relative;
            width: 250px;
            z-index: 1;
            background-color: White;
        }
        .right-div
        {
            border: 2px solid purple;
            height: 300px;
            margin: -330px 120px 0 525px;
            position: relative;
            width: 275px;
            background-color: White;
        }
        .div-content
        {
            margin: 20px 10px 0px 40px;           
        }
        .div-content-right
        {
            margin-left: 80px;
        }
        .top-div
        {
            margin: 10px 0px 0px 0px;
            text-align: center;
        }
    </style>
    <div class="top-div">
        <b>30-Day Free Trial On All Accounts!</b>
    </div>
    <div class="main-div">
        <div class="left-div">
            <div class="div-content">
                <b>Established</b>
                <br />
                <br />
                70-150/Month
                <br />
                Unlimited Users
                <br />
                Unlimited Projects
                <br />
                Unlimited Links
                <br />
                <br />
                <a href="Registration.aspx?planId=3">Select</a>
            </div>
        </div>
        <div class="middle-div">
            <div class="div-content">
                <b>Mom and Pop</b>
                <br />
                <br />
                20-30/Month
                <br />
                Up to 5 Users
                <br />
                Up to 5 Projects
                <br />
                Up to Unlimited Links
                <br />
                <br />
                <a href="Registration.aspx?planId=2">Select</a>
            </div>
        </div>
        <div class="right-div">
            <div class="div-content div-content-right">
                <b>Start Up</b>
                <br />
                <br />
                7-12/Month
                <br />
                Up to 3 Users
                <br />
                Up to 3 Projects
                <br />
                Up to 500 Links
                <br />
                <br />
                <a href="Registration.aspx?planId=1">Select</a>
            </div>
        </div>
    </div>
    <div class="top-div">
        We also offer a basic plan (1 project, 1 user 100 links for free) and
        <br />
        An enterprise plan (unlimited project, unlimited users, unlimited links.
    </div>
</asp:Content>
