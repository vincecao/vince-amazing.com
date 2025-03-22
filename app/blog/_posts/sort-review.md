---
title: Sort Review
date: 2019-06-12 20:23:00
tags:
- Java
- Algorithm
categories: Notes
---
## Linear Search
Basic for search, with for loops

## Bubble Sort
> (exchange) rearrange pairs of elements which are out of order, until no such pairs remain. 
- two for search(pos from end to 0, one from 0 to pos)
- compare value with __next__, if smaller, swap value

``` java
void bubbleSort(){
    for(int i = arrSize - 1; i > 1; i--){       //i > 1
        for(int j = 0; j < i; j++){             //j < i
            if(arr[j]>arr[j+1]){
                swap(j, j+1);
            }
        }
    }
}
```

## Binary Search
- first need sort
- binary Search

``` java
void binarySearch(int value){ //arr is already sorted
    int low = 0;
    int high = arrSize - 1;

    while(low <= high){
        int middle = (low + high)/2;
        if(arr[middle]<value) low = middle + 1;
        else if(arr[middle]>value) high = middle - 1;
        else{
            //found;
            low=high+1;//to stop search
        }
    }
}
```

## Selection Sort
> extract the largest element from the list, exchange with the last element in the current list, and repeat. 
- look for the __smallest__ from pos(init to 1) to end
- swap __smallest__ with (pos-1)
- make pos move to next

``` java
void selectionSort(){
    for(int x = 0; x < arrSize; x++){
        int min = x;
        for(int y = x; y < arrSize; y++){       //find the smallest from remain in arr
            if(arr[y]<arr[x]) x = y;
        }
        swap(x, min);                           //swap the smallest to the left with ordered
    }
}
```

## Insertion Sort
> putting an element in the appropriate place in a sorted list yields a larger sorted list. 
- start from second and always keep sorted
- if next value is smaller than keep the value, and move all the sorted value to right one by one and then insert to right posiiton

``` java
void insertionSort(){                           //like manage Standard 52-card deck
    for (int i = 1; i<arraySize; i++){          //need to sort arr[i]
        int j = i;                              //posible insert position start from i
        int toInsert = arr[i];
        while((j>0 && arr[j-1]>toInsert)){      //put the next element arr[i] into already sorted list, need to move sorted value to right one by one
            arr[j] = arr[j-1];
            j--;
        }
        arr[j] = toInsert;                      //put the insert to j index; break condition is (j = 0) or (arr[j-1]<=toInsert), insert can either be the smallest or the one right next to arr[j-1]
    }
}
```

## Quick Sort
divide-and-conquer algorithm. Its  average running time is O(N log N).
![](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson8_2_files/image003.jpg)
_Figure Courtesy of Weiss Data Structures Book_
``` java
public static void main(String[] args) {
    int[] A = {-4,-1,0,3,9, 45, 10};
    
    A = quicksortII(A, 0, A.length-1);
    
    for (int i = 0; i < A.length; i++){
        System.out.print(A[i]);
        System.out.print(", ");
    }
}

private static int[] quicksortII(int[] A, int start, int end) {
    if(start >= end) {
        return A;
    }
    
    int pIndex = start;
    int pivot = A[end];
    for(int i = start; i < end; i++) {
        if (A[i] < pivot) {
            A = swap(A, pIndex, i);
            pIndex++;
        }
    }
    A = swap(A, pIndex, end);
    A = quicksortII(A, start, pIndex - 1);
    A = quicksortII(A, pIndex + 1, end);
    return A;
}

private static int[] swap(int[] A, int a, int b){
    int temp = A[a];
    A[a] = A[b];
    A[b] = temp;
    return A;
}
```

## Bucket Sort
[桶排序（Bucket sort）](http://www.roading.org/algorithm/introductiontoalgorithm/%E7%AC%AC%E5%85%AB%E7%AB%A0%EF%BC%884%EF%BC%89-%E6%A1%B6%E6%8E%92%E5%BA%8F%EF%BC%88bucket-sort%EF%BC%89.html)
> separate into piles based on the first letter, then sort each pile. 
> place items into various buckets based on a key or partial information about a key.

## Radix Sort
> radix sort can be applied to data that can be compared partially like integers of characters. 
> Radix sort cannot be applied to data that needs to be compared as a whole
>
> The idea of Radix Sort is to do digit by digit sort starting from least significant digit to most significant digit. Radix sort uses counting sort as a subroutine to sort. 

## Heap Sort
[常见排序算法 - 堆排序 (Heap Sort)](http://bubkoo.com/2014/01/14/sort-algorithm/heap-sort/)

## Merging Sort
> Two sorted lists can be easily combined to form a sorted list. 

# Animation
- [Sorting Algorithms Animations](https://www.toptal.com/developers/sorting-algorithms)
- [ソートアルゴリズムを映像化してみた](http://jsdo.it/norahiko/oxIy)

# Reference
- [Introduction to Sorting](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson8_1.htm)
- [Advanced Sorting Algorithms](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson8_2.htm)
- [Non-Comparison Based Sorting Algorithms](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson8_3.htm)
- [Radix Sort](https://www.geeksforgeeks.org/radix-sort/)