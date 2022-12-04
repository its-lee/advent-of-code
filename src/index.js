// // from https://adventofcode.com/2021/day/4
// const calls=`42,32,13,22,91,2,88,85,53,87,37,33,76,98,89,19,69,9,62,21,38,49,54,81,0,26,79,36,57,18,4,40,31,80,24,64,77,97,70,6,73,23,20,47,45,51,74,25,95,96,58,92,94,11,39,63,65,99,48,83,29,34,44,75,55,17,14,56,8,82,59,52,46,90,5,41,60,67,16,1,15,61,71,66,72,30,28,3,43,27,78,10,86,7,50,35,84,12,93,68`.split(',')

// const squares=`90  8  2 34 41
// 11 67 74 71 62
// 47 42 44  1 17
// 21 55 12 91  6
// 60 69 75 92 56

// 49 29 60 45 31
// 94 51 73 33 67
// 21 92 53 95 96
//  2 55 52  8 87
//  4 36 76 83 42

// 23 66 50 84 58
// 62 98 81 76 57
// 24  2 56 79  6
// 55  0 16 64 38
// 12 67  5 97 60

// 46 64  5 39 62
// 16 82 13 77 52
// 18 26 44  0 61
// 25  7 43 42 50
// 11 85 30 28 76

// 51 28 70 65 78
// 62 88 30 36 96
// 80 87  4  1 24
// 63 22 41 79 34
// 18 15 47 26 67

// 48 68 92 67 36
// 54 50 71 98 21
// 20 91 70 78 76
// 87 97 44  3 93
// 84 12 39 96 57

// 86 12 38 44  1
// 10 87 74 53 66
// 14 99 85 48 88
// 59 33 76 71 31
// 83 39  2 67 35

// 62 67 27 96  8
// 81 23 78 33 48
// 80 16  0 86 85
// 26 54 29 32 89
// 88 77 43 18 46

// 87 88 13 49 80
// 78 19 81 56 11
// 18 55 70 44 48
// 31 37 24 95 28
// 20 79 89 94 14

// 10 31 52 49 79
//  8 72 61 27 42
// 73  4 11 43 91
// 37 44 58 19 97
// 96 63 90 13 74

// 71 27 87 40 99
// 69 29 79 64 67
// 85 66  4 28 30
// 23 51 16 49 45
// 92 12 74  1 75

// 46 52 40 12 44
//  0 73 20 86  1
// 85 32  4 42  2
// 21 33 56 39  9
// 49 69 76 98 22

// 42 81  5 11  2
// 57 50 77  8 24
// 85 92 15 39 52
// 37 70 36 79 67
// 34 20 16 93 22

// 49 68 25  4 46
// 17 57 77 59 54
// 65 83 18 84 63
// 36 74 61 22 71
// 14  0 26  3 98

//  1 80 93 66 58
// 38  9 18 60  2
// 70 46 35 88 11
// 95 89 85 29 26
// 82 68 25 15 53

// 97 80 28 17  7
// 67 46 54 95 98
// 38 74 42 57 79
// 63 29 36 78  6
// 90 60 84 10 14

// 18 88  8 96  0
// 66 56 43 47 11
// 69 73 14 71 25
// 27 63 31 44 94
// 75 95 84 74 13

// 92  9 98 17 74
// 46  7  2 51 52
// 21 60  5 87 15
// 86 91 65 69 54
// 61 85  1 62 53

// 89 80  4  0 68
// 17 87 52 86 48
//  3 34 16 25 35
// 13 38 49 66 50
// 36 43 65 84 56

//  9 93 54 92 55
// 32  2 39 96 98
// 58 72 52 83 97
// 12 44 27 24 20
//  0  3 28 56 69

// 66 56 37 36 72
// 35 49 40 43 44
// 54 21 59 12 65
// 74 25 22 80 98
// 27 81 69 97 62

// 72 81 27 61 74
// 26 50 79 13 53
// 49 78 76 70 43
// 51 64 99 46 67
// 68 59 71 17 41

// 97 22 73 30 98
//  8 54 68 47 23
// 70 89 41 52 61
// 81 28 58 90  3
// 88 40 86 46 43

// 94  6 46 43 59
// 41 28 87 31 45
// 83 26 66 81  1
// 76 86 15 42  8
// 67 47 54  4 77

// 96 56 22 67  2
// 95 47 90 54 51
// 78 79 29 82 48
// 61 81 77  6 24
// 71 93 98 26 75

// 95  7 77 94 64
// 19 79 14 24  5
// 50 48  4 71 22
// 35 69 89 54  2
//  6 51  8 82 58

// 87  6 85 53 64
// 50 43 80 61 15
// 69 41 51 76  0
// 78 26 37 62 16
// 12 33 75 58 52

// 67 18 68 52 42
// 37 30 49 31 69
// 93 90 76  9 32
// 60 84 73 94 17
// 21 27 66 43 44

// 89 69 24 14  1
// 88 33 50  2 63
// 12 34  6 97 53
// 28 26 55  8 32
// 49 19 17 64 86

// 31 37 81 65 38
// 96 18 45 19 58
// 35 43  1 49 41
// 46 85 92 53 15
//  3 34  8 14 21

// 35 68 61 45 39
// 46 99 52 55 15
// 74 14 10 62 17
//  8 66 98 89 91
// 58 24 44 27 29

// 28 48 52 18 13
// 17 35 20 11 49
// 93 50 31 95 83
// 27 33 79 44 80
//  4 96 23 65 68

// 70 78 31 86 36
// 99 38 62 95 27
// 52 74 25 80 41
// 30 15 47 19 21
// 77 23 53  9  7

//  0 83 11 25 42
// 50 64 76 67 72
// 75 30 82 15 84
// 58 17 87 61 33
// 98 74 44  3 93

//  5 40 78 24 11
// 57 17 67 60 25
// 37 76 28 56 35
// 66 94  2 90 47
// 86 10 85 46 45

// 63 12  7 74 14
// 21 31 84 51 36
// 66 20 25 46 41
// 15  3 18 62 45
// 35 78 93  2  9

// 90  9 33 63 41
// 25 73 35 97 19
// 99 96 45 71 22
// 84 43 29 14 88
// 42  8  1 78 68

// 98 84 38 95 27
// 18 32 54 12 96
// 56 50  2 45 53
// 14 83 59 72 70
// 22 41 28  9 78

// 89 94 50 33 73
// 31 47  8 35 34
// 43 92 95 21 51
// 68 13 53 24 38
// 80 69 44 87 83

// 32 82 75 73 91
// 99 10 22 58 23
// 86  9 42 81 40
// 71 25  3 78 54
// 80 15 83  5  4

// 58  1  3 11 24
// 66 51 84 44 25
// 37 54 12 27 97
// 38  2 39 85 83
// 89 91 33 79 59

// 49 22 12 84 60
// 34 29 11 92 19
// 97 41 88 53 38
// 26 37  8 36 67
// 91  3 90 52 46

// 77 35 76 56 20
// 39 94 37  3 83
// 78 81 66 29  4
// 82 41 38  0 73
// 59 16 88 15 30

// 34 69 74 90 33
//  9 47 71 94 10
// 76 50 15 19 32
// 49 89 31 21 92
// 80 12 13 97 93

// 45 94 35 59 20
// 18 46 14 36 30
//  6 78 84 38 99
//  5  4 90 92 63
// 34 24 26 75  3

// 80 39  1 93 55
// 67 71 30 44 76
// 38 13 73 21  8
// 11 47 46 69 29
// 15 57 95 52 34

// 45 86 88 80 19
//  3  5 55 36 90
// 54 85 44 18 39
// 57 92 42 25 77
// 43  0 12  1 24

// 74 71 83 29 25
// 56 12 52 33 64
// 68 94 97 14 15
//  7 48 24 80  5
// 54 87 35  1 66

// 55 50 73 72 36
// 17 80 87 68 90
//  8 33 81  1 51
// 67 61 71 54 95
// 93 98 27 56  0

// 19 32 63  6 98
// 13 38 23 28  8
//  5 31 66 72 39
// 99 46  2 64 14
// 91 83 35 85 10

// 67 85 49 68 37
//  8 36 31 81 18
// 74 61 20 80 50
// 34 23 42 52 39
// 21 14 22 58 54

// 16 14 69 13 81
// 21 96 62  7  5
// 95 52  0 67 24
//  6 30 65 66 86
// 28 25 85 56 15

//  4 41 21 86 32
// 95 23 63 28  2
//  9 16 37 84 14
// 92 22 71 42  5
// 46 65 69 81 57

// 45 20 46 44 22
// 62 93 78 58 25
// 91 38 29 68 24
// 21 55 71 43 26
// 64 76 84 80 99

// 92 67 43  5 12
//  2 64 46 15 96
// 95 75 73 38 30
// 10 65 20 39 26
// 36 16 25 27 88

//  9 62 18 58 34
// 85 80 36  2 48
// 16 60 75 72 51
// 39 22 32 61 54
// 40 44 23 87 53

// 93 69 56  4 22
// 73 51 24 53 19
// 83 98 77 94 59
// 52 70 15 40 48
// 60 89 67 92 85

// 48 72 42 80 22
// 99 49 11 77  4
// 28 24  1 63 51
// 85 93 62  7 78
// 35 32  3 21 86

// 36 75 67 79 34
// 20  8 71  6  5
// 50 61 14 52 81
// 26 37  0 80 77
// 93 47 86 54 94

// 50 19 68 54 80
// 81 12 33 87 24
// 28 40 37 30 31
// 41 51 15 27 97
// 67 70 14 77 86

// 89 57 48 37 27
// 44 46 29 63 20
// 74 88 25 68 76
// 18 28 91 59 58
// 99 77 62 64 83

// 22  5 86 37 42
// 47 69 87 34 89
// 64 33 18 56 51
// 30 49 11 79 17
// 61 80  0 29 57

//  7 82 87 15 83
// 76 43 92  1 97
//  0 46  2 86  6
// 48 27 29 61 67
// 53 10 64 93 77

// 65 16 23 26 87
// 58  5 25 97 94
// 43  7 39 69 35
// 62 81 56 13 28
// 76 12 37 14 93

// 90 81 15 55 23
// 58 40  8 56 76
// 83  7 78 89 47
// 65 70 13 48 42
// 16 69 66 52 46

// 30 38 20 32 94
// 91 96 34 23 90
// 16 24 49 50 86
// 65 19 56  7 66
// 80 60 74 71 11

// 60 77 54 25 22
//  9 61 68  6 89
// 15 71 10 84 41
//  1 47  8 43 63
// 69 57 85 24 81

// 54 83 73 52 49
// 69 96 31 57 44
// 19 66 24  6 55
// 91 84 20  3 27
//  7  9 71 43 75

// 90 72 15 99  2
// 73 56 48 28 62
// 40 75  0 59 31
// 43 67 44 24 77
// 98 35  4  3 37

//  2 85 72 39 49
// 58 25 91 69 19
// 34  8 57 42 55
// 80 21 51 64 30
// 28 32 82 84  6

// 33 77 39 13 12
// 86 21 96 82 94
// 78 92 42 45 70
// 31 22 60 80 67
// 79 27 93 55 65

// 49 90 73 72 10
// 98 89 77 88 12
// 83  3 31 47 21
// 65 26 93 55 53
//  5 95 22  8 63

// 79 88 11 62 25
// 85 14 77  4 19
// 41 31 83 26 67
// 46 98 74 99  2
// 44 53 70 36 52

// 21 33 15 57 53
// 56 91 25 69 10
// 52 59 73 96 87
// 65 71 14 37  2
// 39 89 29 83 64

// 88 38 45 39 20
// 99 72 61 96  4
// 23 24 67 49 80
// 77  6 65 76 18
// 59 51 78 33 46

// 44 22  9 90 83
// 93 50  2 54 26
// 68 71 43 85 41
// 38 20  6 64 24
// 81 39 33 56 27

// 98  1 69 30 38
// 67 52 79 31  0
// 24 41 82 55 73
// 33 66 64 20  7
// 65  9 14 70 94

// 59 63 65 25  1
// 36 85 61 82 50
// 52  3 70 30 43
// 79 57 31 71 76
// 19 97 93 77 49

// 60 45 90 32 74
// 77 64 58 44 43
// 71 49 37 21 46
// 50 67  1 24 15
// 14 22  0 40 23

// 65 87 81 64 28
// 53 80 23 76 77
// 49 14 50  2 35
// 85 26 88 94 30
// 79 18 68 15 45

//  6 48 38 63 92
// 51 45 58  4 76
// 78 40 22 17 55
// 79 12 66 61  5
// 68 74  0 93 89

// 66  4 65 71 77
// 47 35 38 83 64
// 53 16  9 56 25
// 92 81 55 60 33
// 80 24 73  0 26

// 26 29 55 76 38
// 79 52 91 84 39
// 50 57 37 34 71
// 33 31 68 92 24
// 81 95  5 70  8

// 83 64 11 67 42
// 97 29 27  4 78
// 23 10 48 71 81
// 80 74 86 17 36
// 61 14 85 21 96

// 18  8  7 88 25
// 59  5 28 57 69
// 64 54 16 70 72
// 13 75 71 33  2
// 60 55 46 51 32

// 23 89 63 96 88
// 71 66  9 53 65
// 56 46 29 95 80
// 44 94 90  3  5
// 11 99 59 60 78

// 42 33 81 25  0
// 46 66 63 82 94
// 52 73 92 30 24
// 59 26 50 87 45
// 79 55 74 17 64

// 95 43 13 98 18
// 62 12 24 88 28
// 23 11 93 51 67
// 71  0 44 64 96
// 66 17 84 90 19

// 38  6 12 75 27
// 28 73 62 50 51
// 63 86 29 98 15
// 46 90  4 58 96
// 20 78 64 56 82

// 19 91 23 40  1
// 78 57 75 43  2
// 35 60 85 74 30
// 80  3 63 54 32
// 82 99 89 25 88

// 88 13 92 11 72
// 56  6 35 55 21
//  8 20 36 60 99
//  1 96 57 45 12
// 41 73 50 83 69

// 42 69 53 76 11
// 38 74 13 14 86
// 18 49 51 67 61
// 26 80 47 16 78
// 66 46 12 68 79

// 22 90 72 93 24
// 55 29 43 28  5
// 99 47 87 40 51
// 81 18 70 20 36
//  0 48 23 46 82

// 91 74 83 95 54
// 60 56 38 37 89
// 87 96 71 50 35
//  5 11 42 72  3
// 77 81 36 49 97

// 71 72 17 34 93
// 45 81 22 67 23
// 61 20 94 14  1
// 85 40 15 36 88
// 54 91 62 73  9

// 66 36 39 58 60
// 96  8 22 49 77
// 76 64 47 78 30
// 50 41 12 69 15
//  7  1 29 72 27

// 90 12 65 13 39
// 75 70 47 36 79
// 31 54 17 10 32
// 76 92 55 83 40
// 49  5 20 44 37

// 16 78 65  5 70
// 63 72 89 93 66
// 21 90 46 54 81
//  7 48 88 60 11
// 95  0 38  3 26

// 19 65 66 41 27
//  7 18 91 52 48
// 87 55 49 68 71
// 85 12  4 40  1
// 57 67  6 11 58

// 91 85 38 14 21
// 63 93 37 76 25
// 68 36  4 24 71
// 43 31 60 19 95
// 52 55 13 83 78`.split('\n\n').map(r => r.split('\n').map(c => c.split(' ')))

// //console.log(calls)
// //console.log(squares)

// // let chunk = [];
// // const chunks = calls.reduce((carry, v, i) => {
// //   if (i % 5 === 0) {
// //     carry.push(chunk)
// //     chunk = [];
// //   }
// //   chunk.push(v)
// //   return carry;
// // }, [])

// const isWinner = (square, callsSoFar) => {

// }

// calls.forEach((call, index) => {
//   const callsSoFar = calls.slice(0, 1);

//   if (index % 5 === 4) {
//     // We've hit the end of a group of 5, check for winners
//     const winner = squares.find(square => isWinner(square, callsSoFar));
//     console.log(winner)
//   }
// });

const input = `NLBLfrNNLvqwbMfDqSjSzzSJjjggcdVs
lTRGPPZnRRHszcsZdSsccZ
CFTTFtFHTtCtDDzrmBtrBD
BJldgBWnRgWNWtllSlWShMcLcVSvVjbVVVvDVVVL
HFGFwqQPQGwHrTFpwmThMbDDVcVmLvvshj
HrpHrGPZZCQrfqlNdtMlzfMltlgn
hQLhBtBtQNQjBjNLvtLjzLJpWbjJdppSwjpCCplllJdj
FGFsmccSPTVPfVVHpJJgwlJwwWJWpCmR
sFPfPFHZTHScnzBttqzvQzqZ
MNTGMTnGWvTwwwnZhNZnWDPPdSjqsSPWjmBCSBWS
RJrtVfRlLrfHgblHJVBjqqFmjCdBJjDmJdSD
tgRftftRcRLftrpHpflHlctVwNNvZNcTwZnznQzwTzmhQwQh
sQPpQpQhnlNsJpJSQphHcZffLfgLHSfHVHHFZZ
zBCvrrWzTwqzcbtbqCbrCCwWLMfVVmmHVfqHFHFgGHLZGmVG
rvvjBzTjrwQRcpjNsRss
RrnNWJJNrplbLJBBWWZstVpmtZftptfmfsMM
GHjnwndzGcqjGgqtfMsvfsMmMvZZ
cQgwHTPjPwGwjdHHTjwccQBDLlWNrLJLNrnWrBRBlS
BBBQJGQslJtcGqfgHpPnfftwqw
RDMLDWLNTLTTNjNgvdqbqRnwqbfwPRzbVHHV
mgdNgdTSMWmSQsQsBQcFSQJr
RqQhRpsdqnvdlPBfzdVlVJPM
SSZsDmSmssGZbJVwPBSzBBMfCf
LFFNGLgLHFWrWHFmLWrLWLrsQshqQnspNcRTjnpTtjRRjh
DshNcgmDVClpCfRs
TnZjTWrtrqtWnGTrbqqTTZZwMpSVRSflRMflMjRCSfpJMSJl
wHbGHrWHWrbnbFtTZcLzLgHzzgcmpNzzzz
hfWQdhQHmPWhqdhQqpdQqWtzvwtCMCRvNCwNzMtNsHsz
lBLnJZLlFBlZjGFbVjjlJRSMzzSszzpGpstSpvMNtN
rVZVgZVgLnjFVlVQDDfhcfmWrQdTfp
zqTrVZvDLGdMMLtcpR
bClsCmQbjFtjljllntsGjGWPdcRWhMppPcpddR
mbggmBtQtlVqVzgrzDzv
LtpnGnGNFtbGntbbQPhTlRpRTzDlcClPCl
mSZHgZMhZVmWPHccllzPzcCP
sZhWvSsBqmBSqmgMqWZjQjfjrLbvGbtNFjvLtb
TvMZMTTzWHNNFPsNbvDG
dhVmwfhcnhRnRfdlGsDNNGqNLFNNTGdq
JTcVVTlThmfmrrWQZHMrpZtJ
zGMBMzPNDNcNZLBzcmLvbHltDbWjbthhqvvHtg
rdJSQSTfQrRnsRfJJQHhWgbhtQblgHWgWH
nTrlpVfSpswsrsTSdnRsfnJJPBZmMBcBZZGmZBmBMmcCNzpC
nfzcnSlRJJScTZTzJZnsNjNrHQqrWBjsBRdWBr
LgHwDLwmMDCphttsqDjNNssBGNsGQB
hvwgwvghPbpggLtmmbCmSfzFfVSlZnncJTPZHSnF
DbsnzDCsBPHDQHFD
GGcWWnrGSjBMrMlhfr
GNpqddqWLqdScWqcVnCswmzJRVzVVbJp
NzPpPBppzjbpCrrQhggqvwwqRwrwQl
SDddnLcDLncghQBWvvgR
tfSLLBmmmDJGFDLJmMMsZZssZzPTzjTpzZzP
RRCrJbSfNrRQjvvHppmpbZvv
llhVGGGMPVTMlTdVzcPVHZmvqpvqZFhHFqmjFrHF
ccGlzPMVwBGfBrLCDJrDLf
VcVGZZVMlncjTqcjsWWf
hzJRtRphQJtBRhzFpdrfrqrFsqswWrmsTmFr
LJHzBQJRhPHpzQWBRzphHRQSMZlnbGMVMVnLMGbDvvbMVl
sVdHFFmhPGVTdFmVFsgPdBBtBZjSpGSvtpBztpGjzt
HCHwlncHfpnjSSpBzz
wWQwlWWlfWcQMfCrfwTRDrHsDmPDgFVTRVsV
qllqNlmglNNdzLDddGGNSHScMHMWPcPSqptQSSHJ
bhhbChVsRjwGRCbZCcSZPpPMMWJSPMtPpW
BhTVBsbrhCTrhfbrCTTTRRfngzrnnLvdzgGvNzdzLNvrLm
nNwNPnjzPsNRHpFDHLLsLVHF
MSBMgMZmWqScCFGWWDFGVvwW
JBghBwTrgchrTbQRjztQPQbfhQ
PPBpBHGfBHGpRRPDLMmnscRLdnzmdw
bMFVTNVTVjbbrCWCsndsDwjDzwmwsnms
QQbJrCCMWCVCVMShHGPQlHhghGlt
dBQMdJQHbWMWHZLRRsmPVJmppJqG
FSrzFnPnGNrlsGps
FvwTnCzDznTwzhtHjZvbdbjQfZgPMv
gJjVQzLgLvPJdMrsDsQtdQrw
hBpmWfSfHCWNfmSppMrDDMwwMbDMlMcbcB
fhphGpfNCpNSNRhGhqPVvjvjjjTzVRPzLr
TsnznnrZsNwGNrbWbSvVgWzVSbgv
mBBFBFQFBhSHggVnmvfW
BJFcRLFFBhLpMNcdNCscZNnqld
vqwQGZNSwNQHQQZNSwvpwMdlnMfBClZBTzBnTfTJCB
sbcrjscccmPmrtFRrtcsPssmVJBfTCldnJJdVzMlBnBJTBlR
tbDmhtdDrPjbDcrDWSHGqQqvHpWSgNHh
VVWSwCpWTVWWwVbbvPJDwvDtwtMttLtH
nfNLcNsfZNnGggZNNqGlMPPDDrlvGHHrtPJMHP
fhgqfznczcjpVRjFLSLz
pvcBCrPrcPBpTccGjrQhQdwMsqdGQddswqhS
FggLnnFzzNFNmstlShMVwQtsgq
RnbzHmNfRHmmnLzRnLDRZHRrCPJBvCWWpcjvJpwWfjwvrc
HfdzzrGfRrQqrGVnznQvgjcjhhlMTlFjchFMVL
swwWWBPNwPwZbvPMFTLjTlgP
BJBJJDZtSrJqnFFfFJ
lqqMSMBMttLMjtHjqjrdBnSfcpfwCTGbCffwCcwbSfTcJf
gVFhVRZgVzJshFZVTbbFfvpcwCTCfbcG
hRWZzRVVZmsWJVRQsQmqqndQrnqnQLqnQqtBlr
SgPhCGGzczlCDVDWrlTL
jvdvFvjqwfdrNfNDlzLzRW
jzjFHnvdtdnmHZttqmbFdFqFsSBJspcgcSPQpsQPBPgpgmSG
qqmQFmrbbWWrtqTVVrgLJTzzNzrJ
nCjMGncHMJvzmmHmVV
DpjPDGwnmDhbwQqZtqqW
JlTTLLMRqlMlJMJgBLLnnCZCFrrrdTGrjPjGFr
vwVpHVHVwvHmQVsFFPZQrjrrrZPNdn
wtvmtwvpmbwVvssPflSBlRBqLMlLJBzSLb
rtrTtBwTsfjZrnqJQplNTcqqlvQT
sHzdWFzSzmGDDRVGVDGHWVhvcLLpNpqJCQqLhClhlcvqpC
VRbmRmRHGdsnggbPMMftZB
LMhtCSSftfTzdCdMhSCdMsQGQbGnbGQQMQggDNgR
FjFHWJwJjRNvQggwnDsm
plBVRRqWRHVHWFTdTthTLCfzflzh
VjVdrHFWPmTjRGSRGq
DMWMZDncQDcfpQzmTQTSQRGTGqNz
WMnsCZJCffDnfCfvnZCPhwVrHBVrBlVHrhswLh
TCZltglCZWQsMhqRHhsrHC
vbbNBbGBmNLzczNmNjrRVbhqHMsVqwHVRwqH
mzBSmzDLvPDPzcLPvGzWWSnsJstWlSsSlddWZJ
nlFJZTlBbFBVZldFnlZlCQvQrsMQzzsCdCLszvLD
hPwgVqSwmRcgSRmWgSwmsfrLPssLvQQfDPDvfMfD
htSwtWHWVRNtWmwgtnJplnbFpBbNTnBTFN
vnhBfSSvRttPJnlctl
frHVDHFwfDLVzVlJMNTHllJHMNlZ
bGGFFbqVLVVbzrFwGfdgFdwvhpCqmBpRqWpBpQpSSpSQSm
RMBMMZBBmmmhZmPjTZhZRPnNQvwWfcSvDfQWBSfdQSNdDc
LHzlVGHqVGzHGzsbCbqglbJddCcvJNDDvdDCJSQvWfwf
HlzrHHgsqbHsVGHqbsGsbbsqFmmjnTTFmnjmRQRPFTFPZtrj
LSLWRMLrLHqqwCBJqCstsG
vbQfPjndQnbcQfmndRwttBNZRsGdsCBJ
bmcnTfbvvPRRRFcmfhjHgzMrSrSMSLzSWgVhML
cqWNtsdsWdlsnBsDJwZJSzFFBZ
RhfvggPfffbVbfPmpMvRRFrZDFFbzDDZZrHwJDbwzb
QhRgvpTVpPgJVGTWWNcTtqNLtG
nppPsSPtPZtFdSWdvFvSnnPscRjjHRTLLjCmRLTmCCscrRcc
wwGqDqfMrGqlhllqhhNwzGNTjCRTmRLTHzJjzBmmRmjCLc
qrblfrVwGwbhwqghfqVhNMhtWSvFdPdQtQdgtWpvWPQWQv
cLJvcccHNcLDwCdRDvjdDR
ttPChbqhZmtWGCtZQwBdsQPQdwwsddQF
WnqbbgGVZCZnnlWhCVtbtVgMMrJLLJNrNcHMJNJTJNMp
vLvWghFhBWqGsVTV
JdpdmbrBmsQGGlVqdw
CJZMHPMZJHmzCnZHHrMjSvcDLDccNSBCDDFDjj
mDgnmRVmqgCSScsVllCj
HLTTMTHZQjZzTzprTGPwtcdlLcllWllWtCSwld
QMHHPzNrQBQGNHzQqbjnBbBbmbfjbqjb
tgPNgzzsSPhjSgbPztSbpDJZRJDTRLTTpRHpNRHZ
crlfGGFlBGBrBcrnFlrFFFCrLpHHJTcLRJJVJvDHtHZRDDRR
tFFtrdmGffnndmzhbWPgzPdsWQPW
JHhvgvzJhBGSLHhgBBSBHzdBflDfllTqLlwLqflfMcctCcfl
RjWQWrnjpjjdNQmmNNWZWpCZtqtDtMwwwcwtcDqcTDqC
PpNPjQspmWpPWRWnVQQpQsWVvvggJBvBSGGdJVhJSJBFdb
FrPTcrCGbcTCChrwNMRDMRvWRdHvzVRVTR
LJmQSmQfJnssmjsHSRFHSHzdVzSFHV
nQtgssgfstjLnmplttgFLLPPpGBrcrchBhCbhhqwPPCC
qFtZtFzstvvPvqttNrCJFWJRFCJFRRWR
ffBBfjQdmdQBfQfmLVQRPRpNNCgPNNRThdWPrr
fQVQlHnBQjBLjlvDqsvPqHMsctSb
rqhJnTTJqTchnTdhncmmgMVqtSBsBspgBtHLLWsBBWpWBHSH
bPldNljGZjNCbFCbwwGDWtBDDtsDtLwt
NjvlvvzQFFQhQqdQnMTM
DJHGghhFhHgsGgThrtrQWBPPJWWCzzzP
lTpffNTdZfrcwlCwCrWz
dmvdvffSSpjTLjFhFMRRbnRbjj
LfSqfmvfWPBPdljNNFVFzVJLNjJz
QZQnQcpMhwhZchQnwbvCCDNDCNpzpFsJpsRsRj
rchgQnvHHhQgvnwHGTffdmdTddTGfWHW
SzZGtmTjgzQCpJwpVqrVzz
NWddPllPDvdbccgcHJLCpClFLLVpFLLVLV
bbdRRWDNdPfgfWPWhdccNddRmBQTSGTTTZnmBQZjmsmnhGst
LgvFffmfVFczCWWmWCSh
MbwbTBDwbZtwBDMhSCGhscWSwVCsSw
QMtdQbqtbZTjVbMtZDMgffnFnJpFvrvFprgvgq
pztdqqzCrpvFqpJQwCvWBRGRWLWcWNBsNNQcNR
HdbjSbVhfhcRscRmNm
MDPffbjbjgFgzCZdFdgt
BmDQZbmmfbmbvhvhbgCsCl
GqVqMHwpGTLHLzwqJlCgsgShhvGvJgGS
LTpzpLFprpfmNrBBlfQP
RjRhBqZbwBbjcwgjPmRtZjZfWFfFznWQNVzQFQQnFzWmMN
vpTPDCdpPSpTSSMzNHzMvFQNNWNM
PDCpLGlGPdrlqRqbqbBhRLqR
PmHZWmJzzzppHfHdHfddDMDLhRbMRgRMNNnPgNMM
TCwBCSSjwqwVqQldTSQTtjVhtbbhbgLLbLLbMggMbDRttc
QBrwFlqCfdzHdvzF
GvgGvgfvlzlHGQWRjGMpjZLjZpGW
DVsqJtnDsJTsTqjpLTdcmWWLpTMp
NNqVhsPrrhqnJNnJNzgBvvjHCCPSjCvQQQ
pqnswpqrrtqrnMsMPMqzVfgGzHBVGVftfBGzGG
QWFQhhmDhJDmJJhhJLcTcfHVvTlTFTfVvgzG
ZDZLddWWSgDCggChRSMPspMjpnqjMPjj
MGwMFLFfssfffcGcDrnCllZtnHQCnDCZWD
dbTvTThtvVVVNWVHClWQzzlQ
TjbgBqTBvBvjRvbqvRmPGMcwSPJPfstSsfMBMf
VtCjjqgwvhCCQdSPJJdGnwwLTT
brrBsmNWlzBpSDcpSWLcWD
SSFsrrrBrCqHVVQFjj
LQQNLgvNDnNPHPDQjtGjnmjttBjVhSmJ
sbWfsMFwdCpdCdwWJVVSltVJlLSlLSft
TFcdMTbpdbwdwgTDQLgDNNrTNz
gfgSsnmnWnhhctcJ
ljjMfwwRTNbRqNlzVzjbtDvPvchvPCccChtJtPVW
GjwpwMpbjMbRMNwqzwpQgQQBfdHfSFrBmQBg
FmcmmTTMdPTGHjtGGnctcN
DgqzTqCgDgpZTrqhSbSpzZfpnHjHlnbtbHBGnGjtQHnlNGWt
zppLhfZTfDqsLMPdMVRwwM
RtsMZJSFRWbRsJbFnFzVBpBqgdRdGzGBpDDj
cTmvrlMQLHLllrhwlmfdQqBpdVpDqGdVpjVzBq
wvTfcHhhmHlhTNLFCnFnNnFnFnMFZJ
grjsjJhhNscgJFgPBnbHwLsRHzHfRLbH
ldMMSSvqtSMGmSSMqLRnlRwbrLlRLRRWwL
VtvDdTGGGCvMDMDTvdjhQjZppPNrJVpZPVFg
wctlscwwBTDnJcLNLHDN
bhhMnhqjzFRjjjPdNDDSvLdJ
MWzMzbrZZZmWQzhWbMhwlspstmnswswllBCgpG
rzmddBcmgFjRzSHHDR
vqpgbnGpqwgbpHtbtRjHTjTfFH
WWqCwvCqCJvCJvwpqvMvnvJMdPgZQQdZcWhBBBrPlLlmdQdm
ZdHTtNPNPSRBbFjjTTsr
WmDhGggmgWWJcZmMhVllzjJCrbjFzbsFFRCj
MMGDmMGGgDGgnWGWpNnvSHStLnwffZtHnw
ddZqRdqjvjZdndlfjwZQQCzmqcHLzzTTHTHzchHTmT
BPVPBBWVLbFFrWgJLpNHcPSHCPSCSCChcCPHTH
VFNbBJrGGJVZGGLwQGnjQL
NllFnzNNnNnNzmrHmDFGLGcccRGjGwHChGwwGh
StMZgPdBgbbBLLvCwCvgGwwj
PsfPtBJMtPZMJPbZVVPPMMDnjDlNlmrnmWnmqzpqmVFm
mGGCppgGWWgmGBzMVzBBBbBS
HnrRdvZvTMtSBtbZ
rHwRrjlrRwrnJrCsCDlLWCqcmCMM
zHhDNmDMNNJHfMNJzjsdvvsvbvjGdCGW
tVwttwwVVFBSFSZqSLjsqLdLCWCvGWcdLs
ZwZgwgpBFGlHgNQmGM
TNqhqvqFNWFrlqFqtDTrhTSTbLfjmjzbwMmMbjzLPDwGLPPP
scVRRQHVQVVHcRHpVgJJCRHMMZGMzCwwLZPZGMMCzLGwZw
dHsnQdHHdnBHspJRsVppFlNTSGGNBWBtTShNTFvG
hdZthMghfbbHCgQgBp
mLjTTjWrTrSCbZsLSbCS
VVPJrjqcWVmrjcmWRWTZTPcWldMNqvhnhMFdvdMhfNdldGNM
sFlsgtZFLFZzSZzpnQrJ
DjRbcjRdBrpRQpMJMJ
jNcfDqqfcDBbmqDFggpFCTpgCNhWWG
LMGGbbpLcpVVbfcpcpdvPVQPmZzJZjqSjSjgZgzqZgzTmm
BrRnBWrtRlhBjmqZCnqJgCSM
FDWWrBHHBBDHhFHttrWFttNpfLppbfcGGsfcGsFfccpcMd
jzHqjHLVqQQlHfzqlbbzqHQscvNsVrvnNZTtvNvvvcrGtv
gJCSRwRpJRtNNSTstnTT
wCMnFgnpCMPnJgpDQbqdQdQQLbzqDHfH
MpqJWmqlNNHmmwwBLLvL
QzFDFfdfQTtSGzTDVMdSFQDwHLBhHLjHjbTbHvLggccwHb
VQfsSDfGftfsdGSDSSQSFssZJCCMlMWWZPWPJMZlRp
lcqqhSsgTMgcqBBZnqZTBJJpdGpGVdRNMJHNGjRJdd
VbfCmPbtttfwwWHdGGrjHPdrRrHN
CffFFmwmDWmtCtvQbSVnTlBSDsqZhVBBSc
gPZTgmwvcnqPzhnW
GJVbDhpjsbWzjfNNNNMj
DFCbrBJsFJpBhbVFJCtvTgmtRTtQQltmwm
BLZgTJPqZzFgCGgCFlFF
ljfcDvNDtHcftNdMCQnCRnhnGjCChG
mVvSdDNDHlmHfNVlSWcSDmtpbpTzppwLPPLPPJLwTwBLPS
FHRzMqvQHvndJnFlNdhZ
fcjWWsjsSmmrgsGgjGcGWsPsnhZddffRdTtNDnZlnDnDThhT
WSPcPsGPSRGCmLcGgpHCzBVqzbQBVpqwwQ
PJzwjrVHzLPrZJHgSsNWbNbmNQtnLSSs
hGhqpTBRRGFFpMpBqGpSNlQQmWlntDbmTQSsml
MpcvMqBRhpFRNCcjwZwPZwJfwjHz
QWJsVCQDbVWbprrWSZWFcmrS
wMwvjRftMLhHfjhdMhRhjtMZrmrmZqBSpBSprvSpTzBTSF
dLNNjhhhVDlNDspN
MNmmtzlQPQmlttlQlHBGFFsHsPnGnFGWgs
CwhhwVZcRVRcCRDWLDFHWWFGss
hwdwdCwCZVSwZcrvhVwCJtbtQtpzmzQHvtpzQmmmpp
CccMdVLJcnCVhCfmjGjlfwwwMwWG
HDSbggDTNbRDHtTgrDpwmnGFfpGgfWfBFmlm
HbDzvQNzHbQLnQddZCcn
jWlqRjWwsqjHHqRDDPMPgpMLpgSMnggC
VQvFfFbdTcfhbcvCpvPrnZgLLpSgLp
PNQVbNTTcbdbfQdbmdVVGfbhBJlHWqGljJqBlqJJlsJJwqqR
WFGnWBTrvtgnjBWsFWggTPlhSfmRSRhZMcSfhZZpRmtZ
CdswHJHNsCbHLVVcZclphwcchfphZZ
LdDCLHsHzbNNNQDsJLNGgPPBvFzjggPrPTrrFB
pGFwwLTPjDcSCPpSdsqtMRMDdVQdVVQz
JBJjZgWgJHvHJgJJbBhNJvgZzsQVRqzdfQQQMMBszRzRzRfV
nlNZWZlJngbvNjgZhNvHhJvprcTclFCcTPSlTCcSpFcLrG
PdHJVCbSJmSVHdLdHbsbsqRwnlDWhZnZccWqDwqDVw
NvMFlGrQTvgpggFNwZhwWWhhqRWRhTqz
gMjvtMpNMrfFrvlffgmdjLLjCmmLHBddLJBS
zNrlzhJGdlHGHplCJQQVbLhRFRbccDSbVDLqRb
WwmwnWjvjmjZPPFFFRDZqVbqqJBS
tmjMJstnWnjvnsTnQMfrQMldrGlCrGfl
MqWfZlpjMPBgffgPNNQnVnnqRsNVLVmR
TcwGCTSvthpzCCTNVnsQVSnRnRQnNn
TbrpDvvCvCwTGDzvzhpzDzljHBZbHWZgHPZJZjJJHfPf
DWNNQQHRpsRWDQPQqHqqgJBCsjjsFFFngBzgjJzl
tMhMwTrTDLMdmMLtMMrbmVbZhJJnnFCCjnlJjjjjBzFBgZ
ttTtDmbfqWcWfqPp
QhvTQqggFsmvjsFTmqZrzzwZrHnwpnplpZ
WCJVGCSLtDPPtHDbHDbdpnrMnMrrpwlZrwpznLpl
VVJbbVfStVHJJVtGmvsfjvssFFTvvsQj
pBCqCqhWjpnWCnffJDjfWzJBZdcvwcPdvJvJcgcrdGdvggrv
tlhbHbmNTbQgbGRvbZGrcg
tVFLQNVlmTmQLQhpzMCBzCpzjjFMnz
qhWHwNqLHrLJjqgHddFchMdnnGnRhMcR
pTzTPVfZQPffNVtVVZfptRGsRbbbbcDsMMZsMZMdRn
CfzPVzCfPBzPBqvWqgBwjNLjjS`.split('\n');

const sumReducer = () => [(acc, v) => acc + v, 0];

const chunkReducer = size => {
  let chunk = [];
  return [
    (acc, v) => {
      chunk.push(v);
      if (chunk.length === size) {
        acc.push(chunk);
        chunk = [];
      }
      return acc;
    },
    []
  ];
};

const intersect = (...v) =>
  v.length <= 1 ? v[0] : intersect([...new Set(v[0].filter(x => v[1].includes(x)))], ...v.slice(2));

const charCode = v => {
  const l = v.toLowerCase();
  return l === v ? l.charCodeAt(0) - 'a'.charCodeAt(0) + 1 : 26 + charCode(l);
};

console.log(
  input
    .map(s => {
      const a = s.split('');
      const i = intersect(a.slice(0, a.length / 2), a.slice(a.length / 2));
      return charCode(i[0]);
    })
    .reduce(...sumReducer())
);

console.log(
  input
    .map(s => s.split(''))
    .reduce(...chunkReducer(3))
    .map(v => charCode(intersect(...v)[0]))
    .reduce(...sumReducer())
);
