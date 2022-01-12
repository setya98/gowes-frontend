import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import Toast from "react-native-toast-message"
import Icon from "react-native-vector-icons/AntDesign"

import { BOOKMARK_ITEM_MUTATION, FETCH_BOOKMARKS_QUERY } from "../util/graphql";

function ButtonWishlist({ user, item }) {
    const [bookmarked, setBookmarked] = useState(false);

    console.log(item.bookmarkedBy)

    useEffect(() => {
        if(
            user.user &&
            item.bookmarkedBy.find((bookmark) => bookmark.userId === user.user.id)
        ) {
            setBookmarked(true)
        } else {
            setBookmarked(false)
        }
    }, [user.user, item.bookmarkedBy])

    const [errors, setErrors] = useState({})

    const { loading, data, refecth } = useQuery(FETCH_BOOKMARKS_QUERY)
    let { getBookmarks: bookmark } = data ? data : []

    const [wishlistItem] = useMutation(BOOKMARK_ITEM_MUTATION, {
        variables: { itemId: item.id },
        update() {
            refecth()
            Toast.show({
                topOffset: 50,
                type: "success",
                text1: "Produk tersimpan di wishlist"
            })
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
            console.log(errors);
          },
    })

    const buttonWishlist = user.user ? (
        bookmarked ? (
            <Icon name="heart" size={26} color={red} />
        ) : (
            <Icon name="hearto" size={26} color={red} />
        )
    ) : (
        <Icon name="hearto" size={26} color={red} />
    )
    
    return (
        <TouchableOpacity onPress={user.user ? wishlistItem : ""}>
            {buttonWishlist}
        </TouchableOpacity>
    )
}

export default ButtonWishlist