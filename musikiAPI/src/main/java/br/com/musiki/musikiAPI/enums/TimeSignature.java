package br.com.musiki.musikiAPI.enums;

public enum TimeSignature {

	THREEFOUR(3, "3/4"),
	FOURFOUR(4, "4/4"),
    FIVEFOUR(5, "5/4"),
    SIXFOUR(6, "6/4"),
    SEVENFOUR(7, "7/4");

    private final int value;
    private final String displayName;

    private TimeSignature(int value, String displayName) {
        this.value = value;
        this.displayName = displayName;
    }

    public int getValue() {
        return value;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }

    public static TimeSignature fromValue(int value) {
        for (TimeSignature timeSignature : TimeSignature.values()) {
            if (timeSignature.getValue() == value) {
                return timeSignature;
            }
        }
        throw new IllegalArgumentException("Valor inválido: " + value);
    }
}
