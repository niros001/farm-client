import {gql} from '@apollo/client';

export const ADD_ITEM_MUTATION = gql`
    mutation AddItem($category: String!, $img_base64: String, $title: String!, $subtitle: String, $amount: Int!, $unit: String!, $description: String, $tags: String) {
        addItem(category: $category, img_base64: $img_base64, title: $title, subtitle: $subtitle, amount: $amount, unit: $unit, description: $description, tags: $tags) {
            id
        }
    }
`;

export const UPDATE_ITEM_MUTATION = gql`
    mutation UpdateITem($id: ID!, $category: String!, $img_base64: String, $title: String!, $subtitle: String, $amount: Int!, $unit: String!, $description: String, $tags: String) {
        updateItem(id: $id, category: $category, img_base64: $img_base64, title: $title, subtitle: $subtitle, amount: $amount, unit: $unit, description: $description, tags: $tags) {
            id
        }
    }
`;
