
# this is a comment

# source read write move destination
start 0 _ r end-zero
start 1 _ r end-one
start _ _ r accept

end-zero 0 0 r end-zero
end-zero 1 1 r end-zero
end-zero _ _ l read-zero

end-one 0 0 r end-one
end-one 1 1 r end-one
end-one _ _ l read-one

read-zero 0 _ l go-home
read-zero 1 _ r reject
read-zero _ _ r accept

read-one 1 _ l go-home
read-one 0 _ r reject
read-one _ _ r accept

go-home 0 0 l go-home
go-home 1 1 l go-home
go-home _ _ r start

accept : 1
reject : 0




// if we do subroutines, then this could be the syntax
// main {
//
// }
//
// go-home {
//
// }
