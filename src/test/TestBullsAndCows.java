package test;

import java.util.InputMismatchException;
import java.util.Scanner;

public class TestBullsAndCows {
	public static void main(String[] args) {
		String generatedRN[], inputRN[];
		int num = 0;
		String stringNum;
		Scanner s = new Scanner(System.in);
		
		
		System.out.println("Let's start the game");
		generatedRN = generateRandomNum();
		
		while(true) {
			int strikeCount = 0, ballCount = 0, outCount = 3;
			System.out.print("Input 3 digits number ex) 12 -> 012: ");
			try {
				num = s.nextInt();
			} catch(InputMismatchException e) {
				System.out.println("Your input is wrong! Program terminated.");
				System.exit(-1);
			}
			if(checkInputDataType(num)) {
				stringNum = Integer.toString(num);
				inputRN = stringNum.split("");
				for(int i = 0 ; i < 3 ; i++) {
					for(int j = 0; j < 3 ; j++) {
						if(generatedRN[i].equals(inputRN[j])) {
							if(i == j) {
								strikeCount++;
							}
							else {
								ballCount++;
							}
						}
							
					}
				}
				
				if(strikeCount == 3) {
					System.out.println("3 Strike! Program terminated.");
					break;
				}
				outCount = outCount - strikeCount - ballCount;
				System.out.println(strikeCount+" Strike, " + ballCount + " Ball, " + outCount + " Out");
			}
			else {
				System.out.println("Out of bounds! Please check again boundary value.");
			}
		}
	}
	
	private static String[] generateRandomNum() {
		int randomNum = 0;
		String[] digits;
		while(true) {
			randomNum = (int) ((Math.random() * ( 999 - 12 )) + 12);
			String stringRN = String.valueOf(randomNum);
			digits = stringRN.split("");
			//if each digit has a different value
			if(!(digits[0].equals(digits[1]) || digits[1].equals(digits[2]) || digits[0].equals(digits[2]))) {
				break;
			}
		}
		return digits;
	}
	
	private static boolean checkInputDataType(int input) {
		boolean isNum = true;
		if(input > 999 || input < 12) 
			isNum = false;
		return isNum;
	}
}
