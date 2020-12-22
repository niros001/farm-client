import {gql} from '@apollo/client';

export const ITEMS_QUERY = gql`
    {
        items {
            id
            category
            img_base64
            title
            subtitle
            amount
            unit
            description
            tags
        }
    }
`;
