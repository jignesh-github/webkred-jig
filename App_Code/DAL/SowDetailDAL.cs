using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Data.SqlClient;

namespace WebKred
{
    public class SowDetailDAL
    {

        #region Variables

        SqlCommand cmd;
        SqlDataAdapter sda;
        DataTable dt;
        SqlConnection con;

        #endregion Variables

        #region Constructor
        public SowDetailDAL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        #endregion Constructor

        #region Method

        public DataTable SowDetailSelect(SowDetailBAL sowDetailBAL)
        {
            try
            {
                dt = new DataTable();
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("SowDetailSelect", con);
                cmd.Parameters.AddWithValue("@ProjectId", sowDetailBAL.ProjectId);
                sda = new SqlDataAdapter(cmd);
                sda.Fill(dt);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int SowDetailInsert(SowDetailBAL sowDetailBAL)
        {
            try
            {
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("SowDetailInsert", con);
                con.Open();
                cmd.Parameters.AddWithValue("@SowDocument", sowDetailBAL.SowDocument);
                cmd.Parameters.AddWithValue("@ProjectId", sowDetailBAL.ProjectId);
                cmd.Parameters.AddWithValue("@SowDetailId", sowDetailBAL.SowDetailId);
                cmd.Parameters["@SowDetailId"].Direction = ParameterDirection.InputOutput;

                cmd.ExecuteNonQuery();
                int SowId = Convert.ToInt32(cmd.Parameters["@SowDetailId"].Value);
                con.Close();

                return SowId;


            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (con.State != ConnectionState.Closed)
                    con.Close();
            }
        }

        public void SowDetailDelete(SowDetailBAL sowDetailBAL)
        {
            try
            {
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("SowDetailDelete", con);
                con.Open();
                cmd.Parameters.AddWithValue("@SowDetailId", sowDetailBAL.SowDetailId);
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (con.State != ConnectionState.Closed)
                    con.Close();
            }
        }

        #endregion Method
    }
}