package br.com.musiki.musikiAPI.converter;

public interface Converter<S, T> {
	T convert(S source);
}
