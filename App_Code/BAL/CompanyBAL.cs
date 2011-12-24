using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebKred
{
    public class CompanyBAL
    {
        #region Variables

        CompanyDAL companyDAL = new CompanyDAL();

        #endregion

        #region Properties

        int companyId;
        public int CompanyId
        {
            get { return companyId; }
            set { companyId = value; }
        }

        string companyName;
        public string CompanyName
        {
            get { return companyName; }
            set { companyName = value; }
        }

        string subdomain;
        public string Subdomain
        {
            get { return subdomain; }
            set { subdomain = value; }
        }

        string cardNumber;
        public string CardNumber
        {
            get { return cardNumber; }
            set { cardNumber = value; }
        }

        string expiresOn;
        public string ExpiresOn
        {
            get { return expiresOn; }
            set { expiresOn = value; }
        }

        string billingZip;
        public string BillingZip
        {
            get { return billingZip; }
            set { billingZip = value; }
        }

        string coupon;
        public string Coupon
        {
            get { return coupon; }
            set { coupon = value; }
        }

        int paymentPlanId;
        public int PaymentPlanId
        {
            get { return paymentPlanId; }
            set { paymentPlanId = value; }
        }

        #endregion

        #region Methods

        public int CompanyInsert()
        {
            try
            {
                return companyDAL.CompanyInsert(this);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}