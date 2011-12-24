using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace WebKred
{
    public class CompanyDAL
    {
        #region Variables

        SqlCommand cmd;
        SqlDataAdapter sda;
        DataTable dt;
        SqlConnection con;

        #endregion Variables

        #region Methods

        public int CompanyInsert(CompanyBAL companyBAL)
        {
            try
            {
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("CompanyInsert", con);
                con.Open();

                cmd.Parameters.AddWithValue("@companyName", companyBAL.CompanyName);
                cmd.Parameters.AddWithValue("@subDomain", companyBAL.Subdomain);
                cmd.Parameters.AddWithValue("@cardNumber", companyBAL.CardNumber);
                cmd.Parameters.AddWithValue("@expiresOn", companyBAL.ExpiresOn);
                cmd.Parameters.AddWithValue("@billingZip", companyBAL.BillingZip);
                cmd.Parameters.AddWithValue("@coupon", companyBAL.Coupon);
                cmd.Parameters.AddWithValue("@paymentPlanId", companyBAL.PaymentPlanId);

                cmd.Parameters.AddWithValue("@companyId", companyBAL.CompanyId);
                cmd.Parameters["@companyId"].Direction = ParameterDirection.InputOutput;

                cmd.ExecuteNonQuery();
                int companyId = Convert.ToInt32(cmd.Parameters["@companyId"].Value);
                con.Close();

                return companyId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (con.State != ConnectionState.Closed)
                {
                    con.Close();
                }
            }
        }

        #endregion
    }
}