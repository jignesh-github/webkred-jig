using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace WebKred
{
    public class LinkSpaceBAL
    {
        int projectId = 0;
        public int ProjectId
        {
            get { return projectId; }
            set { projectId = value; }
        }

        LinkSpaceDAL linkSpaceDAL = new LinkSpaceDAL();

        public string[][] get2dArray(int pageIndex, int recNo)
        {
            return linkSpaceDAL.get2dArray(pageIndex, recNo);
        }

        public LinkSpaceEntity[] getLinkSpaceArray(int pageIndex, int recNo, int projectId)
        {
            try
            {
                return linkSpaceDAL.getLinkSpaceArray(pageIndex, recNo, projectId);
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public void DeleteLinkSpaces(LinkSpaceEntity[] oe)
        {
            try
            {
                linkSpaceDAL.DeleteLinkSpaces(oe);
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public void InsertLinkSpaces(LinkSpaceEntity[] oe)
        {
            try
            {
                linkSpaceDAL.InsertLinkSpaces(oe, this.ProjectId);
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public void UpdateLinkSpaces(LinkSpaceEntity[] oe)
        {
            try
            {
                linkSpaceDAL.UpdateLinkSpaces(oe, this.ProjectId);
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public int getLinkSpaceCount()
        {
            try
            {
                return linkSpaceDAL.getLinkSpaceCount();
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public DataTable getLinkSpaceData()
        {
            try
            {
                return linkSpaceDAL.getLinkSpaceData(this.ProjectId);
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }
    }
}