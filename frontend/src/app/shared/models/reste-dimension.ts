export interface ResteDimension {
    message:string;
    current_page:bigint,
    data:[
      {
        id:bigint,
        dimension:string,
        createdBy:string,
        lastmodifiedBy:string,
        updated_at:Date
      }
    ],
    first_page_url:string,
    from:bigint,
    last_page: bigint,
    last_page_url:string,
    links:[
      {
        url:string,
        label:string,
        active:boolean
      }
    ],
    next_page_url:string,
    path:string,
    per_page:bigint,
    prev_page_url:string,
    to:bigint,
    total:bigint

}
