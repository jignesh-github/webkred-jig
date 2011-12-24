using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;

namespace WebKred
{
    public class CommonClassDAL
    {
        public void sendEmail(string to, string from, string messageBody, string subject)
        {
            SmtpClient sc = new SmtpClient();
            MailMessage message = new MailMessage();
            try
            {
                sc.UseDefaultCredentials = true;
                sc.Host = "localhost";
                sc.Port = 25;
                sc.DeliveryMethod = SmtpDeliveryMethod.Network;
                MailAddress ma = new MailAddress(from);
                message.From = ma;
                message.To.Add(to);
                message.Subject = subject;
                message.IsBodyHtml = true;
                message.Body = messageBody;
                sc.Send(message);
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
    }
}