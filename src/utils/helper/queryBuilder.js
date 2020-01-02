export class QueryBuilder{

    static async buildPaginationQuery(queryData){
        
        let { limit, offset }  = queryData;

        let perPageCount = parseInt(limit) > 0 ? parseInt(limit) : 10;

        let skip = parseInt(offset);

        return{
            perPageCount,
            skip
        }
        
    }

    static async buildShortingQuery(queryData){
        let { sortBy , orderBy } = queryData;

        const orderedBy = orderBy === 'asc' ? 1 : -1;

        let sort = {};

        sort[sortBy] = orderedBy;

        return {
            sort
        }
    }

    static async buildUserFilterQuery(queryData){
        const {
            email,
            createdAt,
            active,
            type,
            entityId,
            entityType
        } = queryData;

        let filteredBy = {};

        if(email){
            filteredBy.email = email;
        }

        if(createdAt){
            filteredBy.createdAt = createdAt;
        }

        if(active){
            filteredBy.isVerified = active === 'true' ? true : false;
        }

        if(type){
            filteredBy.entityType = type;
        }

        if(entityId){
            filteredBy.entityId = entityId;
        }

        if(entityType){
            filteredBy.entityType = entityType;
        }

        return filteredBy;
    }
    
    static async User(queryData){
        this.query = {};

        const { perPageCount , skip } = await this.buildPaginationQuery(queryData);

        const { sort } = await this.buildShortingQuery(queryData);


        const filteredBy = await this.buildUserFilterQuery(queryData);

        this.query.perPageCount = perPageCount;
        this.query.skip = skip;
        this.query.sort = sort;
        this.query.match = filteredBy

        return this.query;
    }
}