<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ForgotPassword.aspx.cs" Inherits="WebKred.ForgotPassword" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>ForGotPassword</title>
    <link rel="stylesheet" type="text/css" href="CSS/StyleSheet.css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="main-forgotPassword">
        <div class="verdana14blue">
            Forgot Password</div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <div class="forgotPassword">
            <div class="padtop10px">
            </div>
            <div class=" verdana12black">
                Username</div>
            <div class="padtop10px">
            </div>
            <div>
                <asp:TextBox ID="txtForgotUserName" runat="server" CssClass="inputtext"></asp:TextBox>
            </div>
            <div>
                <asp:RequiredFieldValidator ID="RequiredFieldValidatorForgotUserName" runat="server"
                    Display="Dynamic" ErrorMessage="User Name Required !" ControlToValidate="txtForgotUserName"
                    ValidationGroup="SendPassword" CssClass="error-msg"></asp:RequiredFieldValidator>
            </div>
            <div>
                <div id="divForgotPassword" class="error-msg">
                    <asp:Label ID="lblErrorMsg" runat="server"></asp:Label>
                </div>
                <div class="padtop10px">
                </div>
                <asp:Button ID="btnSend" ValidationGroup="SendPassword" runat="server" Text="Send Password"
                    CssClass="botton" CausesValidation="true" Style="margin-left: 3%" OnClick="btnSend_Click" />
            </div>
            <div style="text-align:right">
                <a href="#" onclick="javascript:window.close();">Close Window</a>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
