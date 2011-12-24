using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Webkred
{   
    public class PageInfo
    {
        [JsonProperty("pageSize")]
        public int PageSize;
        [JsonProperty("pageNum")]
        public int PageNum;
        [JsonProperty("totalRowNum")]
        public int TotalRowNum;
        [JsonProperty("totalPageNum")]
        public int TotalPageNum;
        [JsonProperty("startRowNum")]
        public int StartRowNum;
        [JsonProperty("endRowNum")]
        public int EndRowNum;
    }

    /*public class SortInfo
    {
        [JsonProperty("columnId")]
        public string ColumnId;
        [JsonProperty("fieldName")]
        public string FieldName;
        [JsonProperty("sortstate")]
        public string SortState;
    }*/

    public class SortInfo
    {
        [JsonProperty("columnId")]
        public string ColumnId;
        [JsonProperty("fieldName")]
        public string FieldName;
        [JsonProperty("sortOrder")] //change to lower case
        public string SortOrder;
        [JsonProperty("getSortValue")]
        public string GetSortValue;
        [JsonProperty("sortFn")]
        public string SortFn;
    }

    public class FilterInfo
    {
        [JsonProperty("columnId")]
        public string ColumnId;
        [JsonProperty("fieldName")]
        public string FieldName;
        [JsonProperty("logic")]
        public string Logic;
        [JsonProperty("value")]
        public string value;
    }

    public class ColumnInfo
    {
        [JsonProperty("id")]
        public string Id;
        [JsonProperty("header")]
        public string Header;
        [JsonProperty("fieldName")]
        public string FieldName;
        [JsonProperty("fieldIndex")]
        public string FieldIndex;
        [JsonProperty("sortOrder")]
        public string SortOrder;
        [JsonProperty("hidden")]
        public string Hidden;
        [JsonProperty("exportable")]
        public string Exportable;
        [JsonProperty("printable")]
        public string Printable;
    }

    public class Parameters
    {

    }

    //[JsonObject(MemberSerialization.OptIn)]
    public class LoadDataInfo
    {
        [JsonProperty("action")]
        public string Action;
        [JsonProperty("recordType")]
        public string recordType;
        [JsonProperty("pageInfo")]
        public PageInfo pageInfo;
        [JsonProperty("sortInfo")]
        public SortInfo[] sortInfoArray;
        [JsonProperty("filterInfo")]
        public FilterInfo[] filterInfoArray;
        [JsonProperty("columnInfo")]
        public ColumnInfo[] columnInfoArray;
        [JsonProperty("parameters")]
        public Parameters parameters;

        public LoadDataInfo()
        {
            //
            // TODO: Add constructor logic here
            //
        }
    }

    public class SaveDataInfo<classT>
    {
        [JsonProperty("action")]
        public string Action;
        [JsonProperty("fieldsName")]
        public string[] fieldsName;

        [JsonProperty("insertedRecords")]
        public classT[] insertedRecords;
        [JsonProperty("updatedRecords")]
        public classT[] updatedRecords;
        [JsonProperty("deletedRecords")]
        public classT[] deletedRecords;

        [JsonProperty("selectedRecords")]
        public classT[] selectedRecords;

        [JsonProperty("recordType")]
        public string recordType;
        [JsonProperty("parameters")]
        public Parameters parameters;
    }
}