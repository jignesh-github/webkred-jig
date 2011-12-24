<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true"
    CodeFile="VideoDisplay.aspx.cs" Inherits="WebKred.VideoDisplay" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <br />
    <br />
    <center>
        <object width="900" height="500" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
            codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0">
            <param name="SRC" value="bookmark.swf">
            <embed src="Video/FirstTimeVideo.swf" width="900" height="500"></embed>
        </object>
    </center>
</asp:Content>
